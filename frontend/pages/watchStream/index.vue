<template>
  <div>
    <v-container>
      <p class="display-1 font-weight-black">瀏覽</p>
      <v-tabs color="orange" v-model="tab">
        <v-tab color="black">分類</v-tab>
        <v-tab>Live 頻道</v-tab>
      </v-tabs>
    </v-container>
    <v-container
      v-if="liveStreams"
      class="d-flex justify-start pa-0 mt-5 flex-wrap"
    >
      <v-tabs-items v-model="tab">
        <v-tab-item :key="0">
          
        </v-tab-item>
        <v-tab-item :key="1">
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
            <p class="display-1 text--primary">
              {{ streams.publisher.stream }}
            </p>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
import { getStreams, getM3U8 } from "../../apis/stream.js";
export default {
  data() {
    return {
      tab: "",
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
    this.fetchLiveStreams();
    // getM3U8().then(res => conosole.log(res))
    this.streamRefresh = setInterval(() => {
      this.fetchLiveStreams();
    }, 5000);
  },
  methods: {
    navigateToStream(streamName) {
      this.$router.push(`${this.$route.fullPath}/${streamName}`);
    },
<<<<<<< HEAD
    fetchLiveStreams() {
      getStreams().then((res) => (this.liveStreams = res.data.live));
    },
=======
    fetchLiveStreams(){
        getStreams().then((res) => (this.liveStreams = res.data.live))
           //console.log('fetch')
    }
>>>>>>> 2870867050aa84f563ffbebcb635a72abd96c84a
  },
};
</script>