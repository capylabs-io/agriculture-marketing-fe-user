<template>
  <v-app-bar class="app-bar" width="100%" height="70px" app flat color="white">
    <div class="nav-container mx-auto black-text full-width px-10">
      <v-row class="d-flex align-center justify-space-between">
        <v-col col="4">
          <div class="nav-left justify-start font-weight-bold">
            <span class="text-xl">Logo Website</span>
          </div>
        </v-col>
        <v-col col="4">
          <div class="nav-link d-flex col-gap-36 justify-center text-md">
            <div class="text-none align-seft-center">Giới thiệu</div>
            <div class="text-none align-seft-center">Sản phẩm</div>
            <div class="text-none align-seft-center">Bảng tin</div>
            <div class="text-none align-seft-center">Trại giống</div>
            <div class="text-none align-seft-center">Vật tư</div>
          </div>
        </v-col>
        <!-- <LanguageSwitch class="nav-lang-responsive"></LanguageSwitch> -->
        <v-col col="4">
          <div class="d-flex justify-end">
            <v-btn
              color="black"
              class="white--text gap-20 border-radius-8"
              @click="gotoRouter('Signin')"
            >
              <span>Đăng Nhập</span>
            </v-btn>
          </div>

          <!-- <v-app-bar-nav-icon
            color="white"
            class="nav-btn-responsive"
            @click.stop="drawer = !drawer"
          ></v-app-bar-nav-icon>

          <v-navigation-drawer
            app
            v-model="drawer"
            right
            hide-overlay
            color="black"
          >
            <v-list nav dense>
              <v-list-item-group v-model="group" active-class=" text--accent-4">
                <v-list-item class="white--text pb-2">
                  <v-list-item-title>
                    <v-img
                      class="align-seft-center drawer-logo"
                      :src="require(`@/assets/fighter-force.webp`)"
                    ></v-img
                  ></v-list-item-title>
                </v-list-item>
                <v-list-item class="white--text">
                  <v-list-item-title
                    ><span>GAME</span>
                    <v-icon class="pb-2 pl-2" small color="white">
                      mdi-chevron-down
                    </v-icon>
                  </v-list-item-title>
                </v-list-item>

                <v-list-item class="white--text">
                  <v-list-item-title>Heroes</v-list-item-title>
                </v-list-item>

                <v-list-item class="white--text">
                  <v-list-item-title>{{
                    $t("navbar.media")
                  }}</v-list-item-title>
                </v-list-item>

                <v-list-item class="white--text">
                  <v-list-item-title>{{ $t("navbar.new") }}</v-list-item-title>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-navigation-drawer> -->
        </v-col>
      </v-row>
    </div>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.app-bar {
  box-shadow: 0px 1px 4px 0px #00000026 !important;
}
</style>
