<template>
  <div class="block_graph" ref="blockGraph">
  </div>
</template>
<script>
import ForceGraph3D from '3d-force-graph'
import Web3 from 'web3-eth'

export default {
  props: ['blockHash', 'parent'],
  mounted() {
    const Graph = ForceGraph3D()
    .width(this.$el.offsetWidth)
    .height(this.$el.offsetWidth / 2)
    .backgroundColor('#000')
    .linkVisibility(({root}) => !root)
    .nodeColor(node => {
      if (node.id == this.parent.from_account.address) {
        return '#F74'
      } 
      if (node.id == this.parent.to_account.address) {
        return '#47F'
      }
      return '#AAA'
    })
    .linkColor('#ACD')(this.$refs.blockGraph)
    .linkDirectionalParticles(3)
    .linkDirectionalParticleSpeed('value')
    .linkWidth('value')
    .linkDirectionalParticleWidth('value')
    .linkCurvature('value')
    const web3 = new Web3('https://cloudflare-eth.com')
    web3.getBlock(this.blockHash, true).then(block => {
      this.gData = {}
      
      this.gData.nodes = block.transactions.map(({from}) => ({id: from.toLowerCase()}))
      this.gData.nodes.push(...block.transactions.map(({to}) => ({id: to.toLowerCase()})))
      // this.gData.nodes.push({id: block.hash.toLowerCase()})
      this.gData.links = block.transactions.map(({from, to, value}) => (
        {
          source: from.toLowerCase(),
          target: to.toLowerCase(),
          value: Math.log(parseInt(value) / 1e18 + 1)
        }
      ))
      // this.gData.links.push(...block.transactions.map(({from}) => (
      //   {
      //     source: from.toLowerCase(),
      //     target: block.hash.toLowerCase(), root: true
      //   }
      // )))
      // this.gData.links.push(...block.transactions.map(({to}) => (
      //   {
      //     source: to.toLowerCase(),
      //     target: block.hash.toLowerCase(), root: true
      //   }
      // )))
      Graph.graphData(
        this.gData
      )
      setTimeout(() => {
        // Aim at node from outside it
        const distance = 100;
        const nodes = this.gData.nodes.filter(node => node.id == this.parent.from_account.address.toLowerCase() || node.id == this.parent.to_account.address.toLowerCase())
        const node = {
          x: (nodes[0].x + nodes[1].x) / 2,
          y: (nodes[0].y + nodes[1].y) / 2,
          z: (nodes[0].z + nodes[1].z) / 2
        }
        const distRatio = 1 + distance/Math.hypot(node.x, node.y, node.z);
        Graph.cameraPosition(
          { x: node.x * distRatio, y: node.y * distRatio, z: node.z * distRatio }, // new position
          node, // lookAt ({ x, y, z })
          3000  // ms transition duration
        );
      }, 5000)
    })
  }
}
</script>
