<template>
  <span
    class="tailwind-svg-icon"
    v-html="icon"
  />
</template>

<script setup lang="ts">
import { ref, watchEffect } from "#imports";

const props = withDefaults(
  defineProps<{
    name: string;
    filled?: boolean;
  }>(),
  { filled: false }
);

const icon = ref<string | Record<string, any>>("");
async function getIcon() {
  try {
    const iconsImport = import.meta.glob("assets/icons/**/**.svg", {
      as: "raw",
      eager: false,
    });
    let rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]();
    if (rawIcon.includes("stroke")) {
      rawIcon = rawIcon.replace(/stroke=".*?"/g, 'stroke="currentColor"');
    } else {
      rawIcon = rawIcon.replace(/fill=".*?"/g, 'fill="currentColor"');
    }

    icon.value = rawIcon;
  } catch {
    console.error(
      `[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`
    );
  }
}

await getIcon();

watchEffect(getIcon);
</script>
<style>
.tailwind-svg-icon svg {
  width: 1em;
  height: 1em;
  vertical-align: middle;
}
</style>
