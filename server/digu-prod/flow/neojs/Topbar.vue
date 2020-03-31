<template>
  <topbar-tool :readonly="disabled"></topbar-tool>
</template>

<script>
import TopbarTool from './components/TopbarTool';

export default {
  components: { TopbarTool },
  data() {
    return {
      disabled: true,
    };
  },
  mounted() {
    const viewType = $.utils.getUrlParam('viewType');
    this.disabled = viewType == null || viewType == '' || viewType == '0';
  },
};
</script>

<style></style>
