<template>
  <div>
    {{mempoolinfo}}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Axios, { AxiosResponse } from 'axios'

@Component({
  components: { },
})
export default class Home extends Vue {
  private mempoolinfo: String = ''
  
  constructor() { 
    super()
    // this.mempoolinfo = ''
  }

  async created() {
    const mempoolinfo = await Axios.get(`http://localhost:3000/getMempoolinfo`)
    this.mempoolinfo = mempoolinfo.data
    console.log('init', this.mempoolinfo)
  }
}
</script>
