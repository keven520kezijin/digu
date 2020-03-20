<template>
  <div>
    <template v-for="item in checkList">
      <dg-checkbox-collapse-item
        :name="name"
        v-if="item === 'isEXCSkip'"
        :key="item"
        :value="checkedList.includes(item)"
        :disabled="isDisabled"
        :title="$options.mxResources.get(item)"
        @change="checked => checkItemChange(item, checked)"
      >
        <el-form-item>
          <el-select
            v-if="EXCSkipVisible"
            v-model="excSkipNode"
            clearable
            filterable
            placeholder="选择异常状态下强制跳转的意图"
            :disabled="isDisabled"
          >
            <el-option
              v-for="item in EXCSkipOptions"
              :key="item.nodeId"
              :label="item.nodeLabel"
              :value="item.nodeId"
            ></el-option>
          </el-select>
        </el-form-item>
      </dg-checkbox-collapse-item>
      <el-form-item v-else :key="item">
        <el-checkbox
          :label="item"
          class="mock-collapse-checkbox"
          :value="checkedList.includes(item)"
          :disabled="item === 'isAllow' ? isArtificial : isDisabled"
          @change="checked => checkItemChange(item)"
        >
          {{ $options.mxResources.get(item) }}
          <el-tooltip
            class="item"
            effect="light"
            placement="bottom-end"
            popper-class="speech-editor-tip"
          >
            <div slot="content">{{ $options.mxResources.get(item + '_content') }}</div>
            <i class="el-icon-question"></i>
          </el-tooltip>
        </el-checkbox>
      </el-form-item>
    </template>
  </div>
</template>

<script>
import DgCheckboxCollapseItem from '../DgCheckboxCollapseItem';

const CHECKBOX_LIST = new Map([
  ['isAllow', '允许转人工'],
  ['isInterrupt', '允许打断'],
  ['isSkip', '平级跳转'],
  ['isEnd', '作为结束语'],
  ['isEXCSkip', '异常跳转'],
  ['isAllow_content', '勾选允许转人工后，本编辑器内的机器人话术内容无效，命中意图直接转人工坐席接听。'],
  [
    'isInterrupt_content',
    '勾选允许打断后，客户在机器说话时可随时进行插话打断。建议本功能用在无需客户听完的场景下，若有重要信息需要传递给客户请勿勾选。',
  ],
  ['isSkip_content', '勾选允许平级跳转后，本编辑器下一级的意图间可支持相互跳转。'],
  ['isEnd_content', '结束语叙述。'],
]);

export default {
  components: { DgCheckboxCollapseItem },
  props: {
    isDisabled: Boolean,
    name: String,
  },
  data() {
      let list = $.utils._checkList.concat([])
      if (list.indexOf('isEnd') < 0) {
          list.push('isEnd')
      }

    return {
      checkList: list,
      checkedList: $.utils._checkedList,
      EXCSkipOptions: $.utils._EXCSkipOptions,
      excSkipNode: $.utils._excSkipNode,
    };
  },
  computed: {
    sorteCheckList() {},
    EXCSkipVisible() {
      return this.checkedList.includes('isEXCSkip');
    },
    isArtificial() {
      return $.utils._dialogVue.speechForm.isArtificial;
    },
  },
  mounted() {
    this.$document.on('endConfirm', () => {
      const checked = this.checkedList.concat('isEnd');
      this.checkedList = [...new Set(checked)];
    });
  },
  destroyed() {
    this.$document.off('endConfirm');
    console.log('destroy',$.utils._checkedList)
  },
  mxResources: CHECKBOX_LIST,
  methods: {
    checkItemChange(item) {
      const checked = !this.checkedList.includes(item);
        if (checked) {
        // if (item !== 'isEnd') {
          this.checkedList = this.checkedList.concat(item);
        // }
      } else {
        this.checkedList = this.checkedList.filter(c => c !== item);
      }
      if (item === 'isEnd') {
        if (checked) {
          $.utils._dialogVue.dialogVisibleChild = true;
        } else {
          let lastCell = $.utils.getLastCells();
          if (lastCell.style == 'robot') {
            lastCell = $.utils.lastV1;
          }
          let cellsChildInfo = $.utils.hasChildNodeInfo(lastCell);
          let delCells = [];
          for (let i in cellsChildInfo.outCells) {
            delCells.push(cellsChildInfo.outCells[i]);
          }
          let v1 = $.utils.changeCellEndTorobot(lastCell);
          graph.removeCells(delCells);
          //关闭弹窗
          mxEditor.hideProperties();
          setTimeout(
            function() {
              mxEditor.execute('showProperties', v1);
            },
            50,
            mxEditor,
            v1,
          );
          $.utils.lastv2 = v1;
        }
      }
      if (item === 'isInterrupt' && !checked) {
        $.utils._dialogVue.speechForm.isInterrupt = false;
        $.utils._dialogVue.setting('speechForm', false);
      }
    },
  },
  watch: {
    checkedList(val) {
        console.log('watch',val);
        $.utils._checkedList = val;

      const isEXCSkip = $.inArray('isEXCSkip', $.utils._checkedList) >= 0;
      if (isEXCSkip) {
        if ($.utils._EXCSkipOptions.length === 1) {
          this.excSkipNode = $.utils._EXCSkipOptions[0].nodeId;
        }
      } else {
        this.excSkipNode = '';
      }
      this.$document.trigger('checkedChange', { isEXCSkip });
    },
    excSkipNode(v) {
      $.utils._excSkipNode = v;
    },
  },
};
</script>

<style></style>
