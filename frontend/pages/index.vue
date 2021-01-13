<template>
  <v-container class="pa-8">
    <carousel-3d :border="0" :width="680" :space="300">
      <slide v-for="(item, i) in liveStreams" :index="i" :key="i">
        <v-img :src="item.src"></v-img>
      </slide>
    </carousel-3d>
    <v-divider class="mx-auto"></v-divider>
    <h3 class="my-5">您可能會喜歡的分類</h3>
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
        <h4 class="my-1">{{category.name}}</h4>
        <v-card-text class="pa-0">
          <v-chip-group
            active-class="orange accent-4 white--text"
            column
            class="ml-2"
          >
            <v-chip v-for="(feature, index) in category.features" :key="index">
              {{ feature }}
            </v-chip>
          </v-chip-group>
        </v-card-text>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
// import { Carousel3d, Slide } from "vue-carousel-3d";

export default {
  layout: "default",
  middleware: "authenticated",
  data() {
    return {
      liveStreams: [
        {
          src: "/twitchScreenShot/index_s1.png",
        },
        {
          src: "/twitchScreenShot/index_s2.png",
        },
        {
          src: "/twitchScreenShot/index_s3.png",
        },
        {
          src: "/twitchScreenShot/index_s4.png",
        },
        {
          src: "/twitchScreenShot/index_s5.png",
        },
      ],
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
  components: {
  },
};
</script>
