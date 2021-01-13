<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" fixed app>
      <v-list class="py-0">
        <v-list-item to="/" router exact color="white" max-height="200">
          <v-list-item-action>
            <v-img
              contain
              height="50"
              width="100"
              src="/yotubelive.png"
            ></v-img>
          </v-list-item-action>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="orange" black>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="text-uppercase black--text"
        >歡迎, {{ username }}</v-toolbar-title
      >
      <v-spacer />
      <v-btn to="/login">登出</v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-format-list-bulleted-triangle",
          title: "瀏覽",
          to: "/watchStream",
        },
        {
          icon: "mdi-laptop",
          title: "我要直播",
          to: "/myStream",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Yotube Live",
    };
  },
  computed: {
    ...mapGetters("user", ["username"]),
  },
};
</script>
