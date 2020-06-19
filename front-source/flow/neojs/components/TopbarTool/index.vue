<template>
  <div :class="['topbar', { readonly: readonly }]">
    <div class="btn-group" v-if="!readonly">
      <a
        @click="handleClick('images/blue.gif')"
        :class="[{ highlight: highlight === 'images/blue.gif' }, 'topbar-add-btn']"
        >新建意图</a
      >
      <!-- <div class="divide"></div>
      <a
        @click="handleClick('images/connect.gif')"
        :class="[{ highlight: highlight === 'images/connect.gif' }, 'topbar-connect-btn']"
        >链接</a
      > -->
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
      <a @click="handleZoom('zoomIn')" class="square">
        <i class="el-icon-zoom-in"></i>
      </a>
      <a @click="handleZoom('zoomOut')" class="square">
        <i class="el-icon-zoom-out"></i>
      </a>
      <!-- <div v-if="!readonly" class="divide"></div>
      <a v-if="!readonly" @click="handleDelete" class="square">
        <i class="el-icon-close"></i>
      </a> -->
    </div>
  </div>
</template>

<script>
export default {
  props: { readonly: Boolean },
  data() {
    return {
      highlight: null,
      isEnd: $.utils.isEnd
    };
  },
  created() { },
  methods: {
    getBtn(title) {
      return $(`#toolbar img[src='${title}']`);
    },
    changeHighlight(title) {
      this.highlight = title;
    },
    handleClick(title) {
      if (title === 'images/blue.gif') {
        if ($.utils.isEnd) {
          alert('开场白为结束语时新建意图不可用')
          return
        } else {
          this.changeHighlight(title);
          // $.utils.dispatch('answer', 'template')
          this.getBtn('images/blue.gif').click()
        }
      } else if (title === 'images/connect.gif') {
        if ($.utils.isEnd) {
          alert('开场白为结束语时连接不可用')
          return
        } else {
          this.changeHighlight(title);
          $.utils.setMode('connect')
        }
      } else if (title === 'images/icon_drag to move.svg') {
        if (this.highlight) {
          this.highlight = null
          $.utils.setMode('select')
        } else {
          this.highlight = title
          $.utils.setMode('pan')
        }
      }
    },
    handleZoom(type) {
      $.utils.dispatch(type)
      // this.getBtn(type === 'in' ? 'images/icon_enlarge.svg' : 'images/icon_shrink.svg').click();
    },
    handleDelete() {
      // this.getBtn('images/delete.gif').click();
      $.utils.dispatch('delete')
    },
  },
  mounted() {
    $.utils.isEnd = false
    // console.log('isEnd: ', $(flowContent).find("[label=开场白]").attr('isEnd'))
    // console.log("handleClick-title: ", title)    

    this.$document.on('mxgraph_ready', (e, editor) => {
      // const highlight = $('#toolbar img.mxToolbarModeSelected').attr('src');
      // if (highlight) {
      //   this.highlight = highlight;
      // }
      var flowContent = $.utils.inheritIntentionLevel(getFlowContent());
      // console.log('created-flowContent: ', flowContent)
      $.utils.isEnd = $(flowContent).find("[label=开场白]").attr('isEnd') === 'true'
      if($.utils.isEnd){
        editor.graph.setConnectable(false)
      }
      // console.log('$.utils.isEnd: ', $.utils.isEnd)
    });
    this.$document.on('insertVertex', () => {
      // this.highlight = 'images/icon_drag to move.svg';
      this.highlight = null
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
