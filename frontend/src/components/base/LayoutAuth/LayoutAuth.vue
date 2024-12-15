<script setup lang="ts">
import {ref} from 'vue';
import ServiceIcon from '../../../assets/icon.png'
import useNavigationConfig from './navigation-config';

const { MENU_ITEMS } = useNavigationConfig()

const isDrawerOpen = ref<boolean>(false)
</script>

<template>
  <v-app>
    <v-navigation-drawer temporary class="app__navbar bg-secondary" v-model="isDrawerOpen">
      <v-list class="app__menu-list custom-scrollbar">
        <v-list-item v-for="(menuItem, key) in MENU_ITEMS" :key="key" :active="$route.name === menuItem.redirect.name" @click="$router.push(menuItem.redirect)" v-show="menuItem.isVisible">
          <v-list-item-title class="text-color2">
            {{menuItem.label}}
          </v-list-item-title>
        </v-list-item>

      </v-list>

    </v-navigation-drawer>
    <v-app-bar class="app__bar bg-primary" flat>
      <template #prepend>
        <v-btn icon="mdi-menu" color="secondary" @click="isDrawerOpen = !isDrawerOpen"/>
      </template>
      <v-img class="app__logo" inline :src="ServiceIcon" @click="$router.push({name: 'index'})"/>
      <v-spacer />
    </v-app-bar>

    <v-main class="app__main bg-accent">
      <v-container class="w-100 h-100 py-0">
        <slot>

        </slot>
      </v-container>
    </v-main>
    <v-footer class="app__footer bg-primary flex-column justify-center text-color3">
      <span>
        РТУ МИРЭА. Все права защищены.
      </span>
      <a to="https://dodopizza.ru/product/arriva">
        Политика конфиденциальности
      </a>
    </v-footer>
  </v-app>
</template>


<style scoped lang="scss">

.app {
  &__bar {
    background-color: #33374d;
  }
  &__navbar {
    padding-top: 8px;
    padding-bottom: 8px;
    height: calc(100vh - 64px);
  }
  &__menu-list {
    height: 100%;
    overflow-y: auto !important;
  }
  &__logo {
    cursor: pointer;
    height: 48px !important;
    width: 84px;
    margin-left: 40px;
    margin-right: 16px;
  }
  &__title {
    font-weight: 700;
    font-size: 40px;
    font-family: DM Sans,sans-serif;
  }
  &__main {
    height: calc(100vh - 64px - 12px)
  }
  &__footer {
    font-size: 12px;
  }
}
</style>
