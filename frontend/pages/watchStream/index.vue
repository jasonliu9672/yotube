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
          <v-container class="d-flex flex-row">
            <v-card
              v-for="(category, index) in categories"
              :key="index"
              tile
              hover
              width="200"
              height="350"
              class="mr-10 mb-6 text-center"
            >
              <v-img :src="category.src" min-height="270"></v-img>
              <h4 class="my-1">{{ category.name }}</h4>
              <v-card-text class="pa-0">
                <v-chip-group
                  active-class="orange accent-4 white--text"
                  column
                  class="ml-2"
                >
                  <v-chip
                    v-for="(feature, index) in category.features"
                    :key="index"
                  >
                    {{ feature }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-container>
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
            @click.prevent="navigateToStream(streams)"
          >
            <p class="display-1 text--primary">
              {{ streams }}
            </p>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-container>
  </div>
</template>
<script>
import { getStreams, getM3U8 } from "../../apis/stream.js";
import { streamIdToUser } from "../../apis/user.js";
export default {
  data() {
    return {
      tab: "",
      liveStreams: [],
      streamRefresh: undefined,
      categories: [
        {
          src: "/lol.png",
          name: "英雄聯盟",
          viewCount: 14.9,
          features: ["MOBA", "動作"],
        },
        {
          src: "/BL.jpg",
          name: "實驗室人生",
          viewCount: 2,
          features: ["生活實況", "生存"],
        },
      ],
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
    }, 10000);
  },
  methods: {
    navigateToStream(streamName) {
      this.$router.push(`${this.$route.fullPath}/${streamName}`);
    },
    async fetchLiveStreams() {
      const streams = await getStreams();
      if (streams.data.live) {

        console.log("curr: ",streams);
        const streamIds = Object.keys(streams.data.live);
        if (Array.isArray(streamIds)) {
          const usernames =  await streamIdToUser(streamIds);
          this.liveStreams = usernames.usernames;
            //(this.liveStreams = res.data.live)
        
          //console.log('fetch')
        }
      }
    },
  },
};
</script>