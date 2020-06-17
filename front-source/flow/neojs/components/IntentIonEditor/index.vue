<template>
  <el-form class="drawer-form">
    <el-collapse v-model="activeNames" @change="handleCollapseChange">
      <el-collapse-item title="使用知识库" name="1">
        <dg-form-item label="意图模版">
          <el-select v-model="intentId" placeholder="请选择意图模板" filterable clearable :disabled="isDisabled">
            <el-option v-for="item in intentTemplateData" :key="item.id" :label="item.intentionName" :value="item.id">
            </el-option>
          </el-select>
        </dg-form-item>
        <dg-form-item label="分类级别">
          <el-select
            v-model="intentLevel"
            placeholder="请选择分类级别"
            filterable
            clearable
            @input="changeIntentionLevel"
            :disabled="isDisabled"
          >
            <el-option v-for="item in intentLevelData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </dg-form-item>
        <dg-form-item label="标题">
          <el-input v-model="intentLabel" placeholder="请输入标题" :disabled="isDisabled"></el-input>
        </dg-form-item>
        <!--        <dg-form-item label="意图预料">-->
        <!--          <el-input-->
        <!--            type="textarea"-->
        <!--            class="dg-textarea"-->
        <!--            v-model="intentKeywords"-->
        <!--            placeholder="如有多条语料请用英文“|”隔开"-->
        <!--            :rows="5"-->
        <!--            :disabled="isDisabled"-->
        <!--          ></el-input>-->
        <!--        </dg-form-item>-->
        <dg-form-item label="意图语料">
          <el-select
            class="dg-textarea"
            v-model="intentKeywords"
            @change="handleSelect"
            multiple
            allow-create
            filterable
            default-first-option
            placeholder="请输入语料内容，按”enter“隔开"
            :disabled="isDisabled"
            popper-class="dropdown-hidden"
          ></el-select>
        </dg-form-item>
        <!-- <dg-form-item label="意图标签">
          <el-input v-model="intentTag" placeholder="请输入意图标签" :disabled="disabledIntentTag"></el-input>
        </dg-form-item> -->
        <dg-checkbox-collapse-item
          name="2"
          title="意图标签"
          :value="disabledIntentionLable"
          :disabled="isDisabled"
          @change="handleDisabledIntentionLable"
        >
          <el-input v-model="intentionLable" placeholder="请输入意图标签"></el-input>
        </dg-checkbox-collapse-item>
        <!---->
        <dg-checkbox-collapse-item
          name="2"
          title="意图优先级"
          :value="disabledIntentionPriority"
          :disabled="isDisabled"
          @change="handleDisabledIntentionPriority"
        >
          <el-select
            class="dg-textarea"
            v-model="intentionPriority"
            @change="handleSelectIntentionPriority"
            multiple
            allow-create
            filterable
            default-first-option
            placeholder="请选择意图"
            :disabled="!disabledIntentionPriority"
            popper-class="dropdown-hidden"
          >
            <el-option
              v-for="item in intentionPriorityOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </dg-checkbox-collapse-item>
      </el-collapse-item>
      <dg-checkbox-collapse-item
        name="2"
        title="话术跳转"
        :value="jumpType === '1'"
        :disabled="isDisabled"
        :collapseDisabled="!jumpType"
        @change="handleJumpTypeChange"
      >
        <el-form-item v-if="!!jumpType">
          <el-select v-model="jumpType" filterable :disabled="isDisabled" @change="changeJumpList">
            <el-option v-for="item in $options.jumpTypeList" :value="item.value" :key="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="showJumpItemType">
          <el-select
            :value="jumpItemType"
            filterable
            placeholder="请选择跳转至哪个话术"
            :disabled="isDisabled"
            @change="changejumpItemList"
          >
            <el-option v-for="item in jumpItemTypeList" :value="item.value" :key="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
      </dg-checkbox-collapse-item>
    </el-collapse>
    <el-button v-if="!isDisabled" @click="handleDelete" type="danger" round class="footer-button">删除</el-button>
  </el-form>
</template>

<script>
import { debounce } from 'lodash';
import DgFormItem from '../DgFormItem';
import DgCheckboxCollapseItem from '../DgCheckboxCollapseItem';

export default {
  components: { DgFormItem, DgCheckboxCollapseItem },
  props: {
    isDisabled: Boolean,
    visible: Boolean,
  },
  data() {
    return {
      intentTemplateData: [],
      intentId: $.utils._intentId,
      intentLabel: $.utils._intentLabel,
      intentLevel: $.utils._intentLevel,
      intentionLable: $.utils._intentionLable,  // 意图标签
      disabledIntentionPriority: $.utils._greaterProhibit !== '', // 意图优先级
      // intentionPriority: [$.utils._greaterProhibit === '' ? [] : $.utils._greaterProhibit.split('|')], // 意图优先级 newIntenPrio
      intentionPriority: this.newIntenPrio(),
      intentionPriorityOptions: [],
      disabledIntentionLable: !!$.utils._intentionLable,  // 是否关闭意图标签
      intentKeywords: $.utils._intentKeywords.split('|'),
      jumpType: $.utils._jumpType,
      showJumpItemType: !!$.utils._jumpType,
      jumpItemType: $.utils._jumpItemType,
      preJumpTtemType: '',
      intentLevelData: [],
      jumpItemTypeList: [],
      activeNames: ['1', '2'],
    };
  },
  created() {
    // console.log('created - $.utils._greaterProhibit: ', $.utils._greaterProhibit)
    // console.log('$options: ', $options)
    let intentionArr = []
    if (localStorage.getItem('intentionLevelDescription') !== 'undefined') {
      const intentionLevelDescription = JSON.parse(localStorage.getItem('intentionLevelDescription'))
      // console.log('intentionLevelDescription: ', intentionLevelDescription)
      for (let key in intentionLevelDescription) {
        // console.log('key: ', key)
        const obj = {}
        obj.value = key
        obj.label = key
        intentionArr.push(obj)
        // console.log('intentionLevelDescription[key].children: ', intentionLevelDescription[key])
        if (intentionLevelDescription[key] && intentionLevelDescription[key].children && intentionLevelDescription[key].children.length > 0) {
          intentionLevelDescription[key].children.forEach((v, i) => {
            const chiObj = {}
            chiObj.value = key + (i + 1)
            chiObj.label = key + (i + 1)
            intentionArr.push(chiObj)
          })
        }
      }
      // console.log('intentionArr: ', intentionArr)
      this.intentLevelData = intentionArr
    } else {
      this.intentLevelData = [
        {
          value: 'A',
          label: 'A',
          description: '立即还款',
        },
        {
          value: 'B',
          label: 'B',
          description: '不清楚',
        },
        {
          value: 'C',
          label: 'C',
          description: '是本人、不还款',
        },
        {
          value: 'D',
          label: 'D',
          description: '能否还款后所有横行意图中异常、静默、复述挂断',
        },
        {
          value: 'E',
          label: 'E',
          description: '非本人、以及能否还款前一轮的意图',
        },
        {
          value: 'F',
          label: 'F',
          description: '未接通、开场白就主动挂断',
        },
      ]
    }

  },
  jumpTypeList: [
    {
      value: '1',
      label: '话术跳转',
    },
  ],
  methods: {
    newIntenPrio() {
      var id = ''
      var atherList = []
      if ($.utils.getLastCells()) {
        id = $.utils.getLastCells().id
        atherList = getFlowXml(id)
      }
      // console.log('atherList: ', atherList)
      var newList = []
      if ($.utils._greaterProhibit) {
        var list = $.utils._greaterProhibit.split('|');
        list.forEach(l => {
          atherList.forEach(a => {
            if (a.value === l) {
              newList.push(a.label)
            }
          })
        })
      }
      return newList
    },
    // 意图优先级选择
    handleSelectIntentionPriority(e) {
      // console.log('e: ', e)
    },
    handleDisabledIntentionPriority(e) {
      this.disabledIntentionPriority = !this.disabledIntentionPriority
    },
    handleDisabledIntentionLable(e) {
      // console.log('handleDisabledIntentionLable-e: ', e)
      this.disabledIntentionLable = !this.disabledIntentionLable
      // console.log('this.disabledIntentionLable: ', this.disabledIntentionLable)
    },
    async queryIntentionTemplateList() {
      // console.log('queryIntentionTemplateList: ')
      try {
        const data = {
          industryId: window.industryType == null ? '' : window.industryType,
          currentPage: 0,
          pageSize: 500,
        };
        const res = await this.$apiClient.post('intention/queryIntentionSpeechcraftList.json', data);
        this.intentTemplateData = res.returnObject.recordList;
      } catch (e) {
        this.$message.error($.utils.getErrorMessage(e.errorInfoList));
      }
    },
    handleJumpTypeChange(v) {
      // console.log('handleJumpTypeChange-v: ', v)
      if (!v) {
        alert(0)
        this.nochangeJumpList();
      } else {
        this.jumpType = '1';
      }
    },
    handleSelect(val) {
      $.utils._intentKeywords = val.join('|')
    },
    nochangeJumpList() {
      var currentEdges = currentCell.edges;
      var sourceCell;
      for (var i in currentEdges) {
        if (currentEdges[i].style == 'redEdge') {
          sourceCell = currentEdges[i].source;
        }
      }
      if (!sourceCell) {
        this.jumpType = '';
        return false;
      }
      $.utils._dialogVue.dialognoJumpVisible = true;
    },
    changejumpItemList: function(val) {
      this.preJumpTtemType = val;
      let _allAcellsExStart = $.utils.getACellsExStart();
      //获取当前的cell
      let _currentCell = $.utils.getLastCells();
      let _currentCellEdges = _currentCell.edges;

      //获取当前cell的target
      let _currentCellTarget = '';
      let _currentCellTargetType = '';
      //新的target
      let _currentCellTargetNew = '';
      let _currentCellTargetNewType = '';

      //获取当前的cell的targetCell,和type,old
      for (var i in _currentCellEdges) {
        if (_currentCell.id == _currentCellEdges[i].source.id) {
          _currentCellTarget = _currentCellEdges[i].target;
          _currentCellTargetType = _currentCellTarget.value.nodeName;
        }
      }

      //新的选择的targetCell和他的type new
      for (let i in _allAcellsExStart) {
        if (_allAcellsExStart[i].value == val) {
          _currentCellTargetNew = _allAcellsExStart[i].cell;
          _currentCellTargetNewType = _allAcellsExStart[i].nodeName;
        }
      }

      /**
       * A:当前连接的是紫色结束语模块，选择跳转的为黄色话术模块 (紫色=> 黄色)
       */
      if (_currentCellTargetType == 'End' && _currentCellTargetNewType == 'Robot') {
        $.utils._dialogVue.removeCellTypeName = '结束模块';
      }

      /**
       * B:当前连接的是紫色结束语模块A，选择跳转的是紫色结束模块B(紫色=>紫色)
       */
      if (_currentCellTargetType == 'End' && _currentCellTargetNewType == 'End') {
        $.utils._dialogVue.removeCellTypeName = '结束模块';
      }
      /**
       * D:黄色话术模块A，选择跳转的为黄色话术模块B (黄色=>黄色)
       */

      if (_currentCellTargetType == 'Robot' && _currentCellTargetNewType == 'Robot') {
        $.utils._dialogVue.removeCellTypeName = '话术模块';
      }
      /**
       * ( 黄色=>紫色)
       */
      if (_currentCellTargetType == 'Robot' && _currentCellTargetNewType == 'end') {
        $.utils._dialogVue.removeCellTypeName = '话术模块';
      }
      $.utils._dialogVue.dialogExceptionVisible = true;
      $.utils._dialogVue.dialogExceptionCellTarget = _currentCellTarget;
      $.utils._dialogVue.dialogExceptionCellTargetNew = _currentCellTargetNew;
    },
    handleDelete() {
      graph.removeCells();
      this.$emit('cancel');
    },
    handleCollapseChange(v) {
      this.activeNames = v;
    },
    updateModel: debounce(() => {
      updateModel(currentCell);
    }, 300),
  },
  mounted() {
    // 平级意图
    var cell = $.utils.getLastCells()
    if (cell) {
      this.intentionPriorityOptions = getFlowXml(cell.id)
    }

    const handleNochangeJumpConfirm = () => {
      this.jumpType = '';
    };
    const handleJumpConfirm = () => {
      this.jumpItemType = this.preJumpTtemType;
    };
    if (this.visible) {
      this.$document.on('nochangeJumpConfirm', handleNochangeJumpConfirm);
      this.$document.on('jumpConfirm', handleJumpConfirm);
      this.queryIntentionTemplateList();
      if (this.jumpType == 1) {
        this.jumpItemTypeList = $.utils.getACellsExStart(false);
      }
      if (this.jumpItemType !== '') {
        let item = $.utils.getCellByNodeId(this.jumpItemType);
        this.jumpItemTypeList.push({
          value: item.id,
          cell: item,
          nodeName: item.value.nodeName,
          label: item.value.attributes.label.nodeValue,
        });
      }
    } else {
      this.$document.off('nochangeJumpConfirm');
      this.$document.off('jumpConfirm');
      this.updateModel();
    }
  },
  watch: {
    // 意图优先级
    intentionPriority(v) {
      // $.utils._intentionPriority = v;
      var newList = []
      v.forEach(o => {
        newList.push('N' + o)
      })
      // console.log('newList: ', newList)
      $.utils._greaterProhibit = newList.join('|')
      this.updateModel();
    },
    disabledIntentionPriority(v) {
      // console.log('v: ', v)
      // console.log('getLastCells: ', $.utils.getLastCells())
      // console.log('graph.getModel().cells: ', graph.getModel().cells)
      var cell = $.utils.getLastCells()
      if (cell) {
        this.intentionPriorityOptions = getFlowXml(cell.id)
      }
    },
    intentId(v) {
      $.utils._intentId = v;
      this.intentTemplateData.forEach(elem => {
        if (elem.id === v) {
          this.intentLabel = elem.intentionName;
        }
      });
    },
    intentLabel(v) {
      // alert('bt')
      $.utils._intentLabel = v;
      this.updateModel();
    },
    intentLevel(val) {
      $.utils._intentLevel = val;
    },
    intentionLable(val) {
      $.utils._intentionLable = val;
      this.updateModel();
    },
    // intentKeywords(val) {
    //   // $.utils._intentKeywords = val;
    //   console.log(val.join('|'));
    //   $.utils._intentKeywords = val.join('|');
    // },
    jumpType(val) {
      $.utils._jumpType = val;
      this.jumpItemTypeList = $.utils.getACellsExStart(true);
      // console.log('jumpItemTypeList: ', this.jumpItemTypeList)
      if (!val) {
        this.jumpItemType = '';
        this.showJumpItemType = false;
      } else {
        this.$nextTick(() => {
          this.showJumpItemType = true;
        });
      }
    },
    jumpItemType(val) {
      $.utils._jumpItemType = val;
    },
  },
};
</script>

<style lang="less" scoped>
.dg-textarea {
  width: 100%;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  box-sizing: border-box;
}
.footer-button {
  width: 100%;
  margin-top: 40px;
}
</style>
