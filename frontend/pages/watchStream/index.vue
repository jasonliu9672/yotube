<template>
  <div>
    <v-container
      v-if="liveStreams"
      class="d-flex justify-start pa-0 mt-5 flex-wrap"
    >
      <v-card
        v-for="(streams, index) in liveStreams"
        :key="index"
        outlined
        tile
        hover
        width="350"
        height="250"
        class="mr-6 mb-6 text-center"
        color="grey"
        @click.prevent="navigateToStream(streams.publisher.stream)"
      >
        <p class="display-1 text--primary">{{ streams.publisher.stream }}</p>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import { getStreams } from "../../apis/stream.js";
export default {
  data() {
    return {
      liveStreams: [],
      streamRefresh: undefined,
    };
  },
//   async asyncData() {
//     const response = await getStreams();
//     console.log(response.data);
//     return { liveStreams: response.data.live };
//   },
  created() {
    this.fetchLiveStreams()
    this.streamRefresh = setInterval(() => {
      this.fetchLiveStreams()
    }, 5000);
  },
  methods: {
    navigateToStream(streamName) {
      this.$router.push(`${this.$route.fullPath}/${streamName}`);
    },
    fetchLiveStreams(){
        getStreams().then((res) => (this.liveStreams = res.data.live))
           //console.log('fetch')
    }
  },
};
</script>