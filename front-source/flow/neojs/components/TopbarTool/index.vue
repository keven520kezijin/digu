<template>
  <div :class="['topbar', { readonly: readonly }]">
    <div class="btn-group" v-if="!readonly">
      <a
        @click="handleClick('images/blue.gif')"
        :class="[{ highlight: highlight === 'images/blue.gif' }, 'topbar-add-btn']"
        >新建意图</a
      >
      <div class="divide"></div>
      <a
        @click="handleClick('images/connect.gif')"
        :class="[{ highlight: highlight === 'images/connect.gif' }, 'topbar-connect-btn']"
        >链接</a
      >
    </div>
    <div class="btn-group">
      <a
        v-if="!readonly"
        @click="handleClick('images/icon_drag to move.svg')"
        :class="[{ highlight: highlight === 'images/icon_drag to move.svg' }]"
      >
        <i class="el-icon-rank"></i>
      </a>
      <div v-if="!readonly" class="divide"></div>
      <a @click="handleZoom('in')" class="square">
        <i class="el-icon-zoom-in"></i>
      </a>
      <a @click="handleZoom('out')" class="square">
        <i class="el-icon-zoom-out"></i>
      </a>
      <div v-if="!readonly" class="divide"></div>
      <a v-if="!readonly" @click="handleDelete" class="square">
        <i class="el-icon-close"></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: { readonly: Boolean },
  data() {
    return {
      highlight: null,
    };
  },
  methods: {
    getBtn(title) {
      return $(`#toolbar img[src='${title}']`);
    },
    changeHighlight(title) {
      this.highlight = title;
    },
    handleClick(title) {
      this.getBtn(title).click();
      this.changeHighlight(title);
    },
    handleZoom(type) {
      this.getBtn(type === 'in' ? 'images/icon_enlarge.svg' : 'images/icon_shrink.svg').click();
    },
    handleDelete() {
      this.getBtn('images/delete.gif').click();
    },
  },
  mounted() {
    setTimeout(() => {
      const highlight = $('#toolbar img.mxToolbarModeSelected').attr('src');
      if (highlight) {
        this.highlight = highlight;
      }
    }, 500);
    this.$document.on('insertVertex', () => {
      this.highlight = 'images/icon_drag to move.svg';
    });
  },
};
</script>

<style lang="less" scoped>
.topbar {
  margin-right: 10px;
  display: flex;
  &.readonly {
    right: 402px;
  }
}
.btn-group {
  display: flex;
  align-items: center;
  height: 32px;
  background: #fff;
  border-radius: 3px;
  box-sizing: border-box;
  padding: 0 6px;
  margin-right: 10px;
  &:last-of-type {
    margin-right: 0;
  }
  .divide {
    width: 1px;
    background: #aeb5c0;
    height: 18px;
    margin: 0 5px;
  }
  > a {
    padding: 2px 7px;
    font-size: 14px;
    color: #606266;
    font-weight: 500;
    cursor: pointer;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    &.square {
      padding: 2px 4px;
      margin: 0 2px;
    }
    &.highlight {
      background-color: #dddfe6;
    }
    &:active,
    &:hover {
      background-color: #f1f2f5;
    }
    > i {
      font-size: 17px;
      font-weight: 500;
    }
  }
}
</style>
<style>
#toolbar {
  visibility: hidden;
  position: absolute;
}
</style>
