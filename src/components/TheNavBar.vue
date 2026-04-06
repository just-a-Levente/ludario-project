<script setup lang="ts">
import NavBarItem from './NavBarItem.vue'
</script>

<template>
  <div class="flex h-dvh w-1/6 flex-col items-end gap-y-2 bg-orange-300 px-3 py-6">
    <img src="/logo_with_title.png" alt="Ludario logo" class="w-56 pb-6" />

    <NavBarItem>
      <template #navitem>Catalogue</template>
      <template #navicon>
        <img src="/navbaricons/orange_hexagon_book.png" />
      </template>
    </NavBarItem>

    <NavBarItem>
      <template #navitem>Charts</template>
      <template #navicon>
        <img src="/navbaricons/orange_hexagon_pie_chart.png" />
      </template>
    </NavBarItem>

    <NavBarItem>
      <template #navitem>Discover</template>
      <template #navicon>
        <img src="/navbaricons/orange_hexagon_explore.png" />
      </template>
    </NavBarItem>
  </div>
</template>
