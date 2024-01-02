<template>
  <div>
    <home-landing />
  </div>
</template>

<script>
export default {
  name: 'TheHomeLayout',
  components: {
    HomeLanding: () => import('../components-default/HomeLanding')
  }
};
</script>
