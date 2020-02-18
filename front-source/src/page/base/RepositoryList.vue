<template>
  <!-- <div :class="{'sub-collapse':isSubCollapse}"> -->
  <div class>
    <!-- <div class="content-box-top" style="position: fixed">
      <div class="content-box-top-right">
        <el-button type="primary" @click="goGeneral">通用知识库</el-button>
      </div>
    </div>-->
    <div class="box-card repository-card" :height="height">
      <div class="content-head">
        <div>
          <el-input
            v-model="select_word"
            clearable
            placeholder="筛选关键词"
            @change="searchChange"
            class="handle-input mr10"
            @keyup.native.13="search"
          ></el-input>
          <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>
        <div class="right-menu-box">
          <!--<div class="right-menu-item">-->
          <!--<el-button type="primary" icon="iconfont icon-icon_rep_search">&nbsp;匹配音频</el-button>-->
          <!--</div>-->
          <div class="right-menu-item">
            <el-button
              type="primary"
              icon="iconfont icon-icon_rep_search"
              @click="addGroupAction"
            >&nbsp;新增知识库</el-button>
          </div>
          <el-dropdown @command="handleDropdown">
            <el-button type="primary">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="export">批量导出知识库</el-dropdown-item>
              <el-dropdown-item command="edit">批量修改知识库</el-dropdown-item>
              <el-dropdown-item command="delete">批量删除知识库</el-dropdown-item>
              <el-dropdown-item command="deploy">批量发布知识库</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="handleCommand" trigger="click" v-if="multipleSelection.length">
            <span class="el-dropdown-link">
              <el-button icon="iconfont icon-icon_move"></el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>未分类</el-dropdown-item>
              <el-dropdown-item
                v-for="item in moveRepositoryMenu"
                :command="item.id"
                :key="item.id"
              >{{ item.typeName }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <!-- <el-tooltip class="item" v-else effect="dark" content="移动" placement="top-start">-->
          <!-- <el-button icon="iconfont icon-icon_move" disabled></el-button> -->
          <!-- <el-button>上左</el-button> -->
          <!-- </el-tooltip> -->

          <!-- <el-button icon="iconfont icon-ico_delete" :disabled="!multipleSelection.length" @click="handleDelItems"></el-button> -->
          <!-- <el-button icon="iconfont icon-icon_rep_add" @click="addGroupVisible=true"></el-button> -->
          <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
            <el-button
              icon="iconfont icon-ico_delete"
              :disabled="!multipleSelection.length"
              @click="handleDelItems"
            ></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="新增知识库" placement="top-start">
            <el-button icon="iconfont icon-icon_rep_add" @click="addGroupVisible=true"></el-button>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="匹配音频" placement="top-start">
            <el-button icon="iconfont icon-icon_rep_search"></el-button>
          </el-tooltip>-->
          <!-- <i class="iconfont icon-ico_delete" :class="{'blue':multipleSelection.length}" @click="handleDelItems"></i> -->
          <!-- <i class="iconfont icon-icon_rep_add" @click="addGroupVisible=true"></i> -->
          <!-- <i class="iconfont icon-icon_rep_search" ></i> -->
        </div>
      </div>
      <div class="sub-header">
        <el-checkbox v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <el-select v-model="sortMethodResult" placeholder="排序方式" @change="sortAction">
          <el-option
            v-for="item in sortMethod"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <el-checkbox-group v-model="multipleSelection">
        <el-row :gutter="10" class="card-group" type="flex">
          <el-col :span="6" v-for="part in listOfPageData" :key="part.id">
            <el-card class="card-item">
              <el-checkbox class="card-checkbox" :label="part.id">
                <img src="../../../static/img/icon-books.png" class="image knowledge-image" />
              </el-checkbox>
              <div style="padding: 14px;">
                <i class="el-icon-edit-outline edit" @click="handleModifyGroup(part)"></i>
                <span>{{ part.groupName }}</span>
                <div class="time">
                  <span>更新时间&nbsp;</span>
                  {{ part.editTime }}
                </div>
                <div class="bottom clearfix operation-buttons">
                  <i class="el-icon-edit" @click="handleEditClick(part)"></i>
                  <i class="el-icon-view" @click="handleConfig(part)"></i>
                  <i class="el-icon-delete" @click="handleDelItems(part.id)"></i>
                  <i class="el-icon-document-copy" @click="handleCopyClick(part)"></i>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-checkbox-group>

      <!-- <div class="repository-box">
        <div>
          <el-table
            stripe
            :data="listOfPageData"
            @sort-change="sortChange"
            @selection-change="handleSelectionChange"
            :height="tableHeight"
          >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="groupName" label="知识库名称"></el-table-column>
            <el-table-column width="200" sortable prop="editTime" label="更新时间"></el-table-column>
            <el-table-column label="操作" width="200" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="handleModifyGroup(scope.$index, scope.row)">修改名称</el-button>
                <el-button type="text" @click="handleConfig(scope.row)">配置</el-button>

                <el-button
                  v-if="scope.row.itemUpdateFlag==1"
                  type="text"
                  @click="publishKnowledgeGroup(scope.$index, scope.row)"
                >发布</el-button>
                <el-button v-else type="text" disabled>发布</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>-->
    </div>
    <div class="pagination">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        layout="total, prev, pager, next,jumper"
        :total="pagination.total"
        :page-size="pagination.pageSize"
      ></el-pagination>
    </div>

    <!-- 增加 -->
    <!-- <el-dialog title="新增知识库" class="creat-faq-dialog" :visible.sync="addGroupVisible" width="600px">
      <el-form
        ref="addGroupForm"
        :model="addGroupForm"
        label-width="114px"
        :rules="addGroupFormRules"
      >
        <el-form-item label="知识库名称" prop="groupName">
          <el-input v-model="addGroupForm.groupName" placeholder="输入知识库名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddGroup">确 定</el-button>
      </span>
    </el-dialog>-->
    <!-- 修改 -->
    <el-dialog
      title="修改名称"
      class="creat-faq-dialog"
      :visible.sync="modifyGroupVisible"
      width="600px"
    >
      <el-form
        ref="modifyGroupForm"
        :model="modifyGroupForm"
        label-width="114px"
        :rules="modifyGroupFormRules"
      >
        <el-form-item label="知识库名称" prop="groupName">
          <el-input v-model="modifyGroupForm.groupName" placeholder="输入知识库名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyGroupVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyKnowledgeGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->
    <el-dialog title="删除知识库" :visible.sync="delItemsVisible" width="400px">
      <div>您确定要删除已选择的知识库吗？如果知识库正在使用中，删除后将不能在已关联的话术中正常使用。</div>
      <span slot="footer" class="dialog-footer">
        <el-button
          @click="
            delItemsVisible = false;
            deleteSingleKnowleage = null;
          "
        >取 消</el-button>
        <el-button type="primary" @click="removeKnowledgeGroupList">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 移动多个列表-->
    <el-dialog :title="moveItemNameTitle" :visible.sync="moveItemsVisible" width="400px">
      <div>您确定要移动此{{ multipleSelection.length }}条知识库到{{ moveItemName }}吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="moveItemsVisible = false">取 消</el-button>
        <el-button type="primary" @click="moveKnowledgeGroup">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除多个列表-->
    <el-dialog title="删除知识库" :visible.sync="deleteItemsVisible" width="400px">
      <div>您确定要删除{{ multipleSelection.length }}条知识库吗？</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteItemsVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteKnowleageList">确 定</el-button>
      </span>
    </el-dialog>
    <!--  删除知识库分类 -->
    <!-- <el-dialog title="删除确认" :visible.sync="removeTypeVisible" width="400px">
                <div >您确定要删除知识库分类“{{removeTypeName}}”吗？<br/>相关知识库将不会被删除，继续保留在“未分类”中</div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="removeTypeVisible = false">取 消</el-button>
                    <el-button type="primary" @click="removeGroupEnter">确 定</el-button>
                </span>
    </el-dialog>-->
    <el-drawer :title="knowledgeFormTitle" :visible.sync="showDrawer">
      <knowledge-group-form
        v-if="konwledgeFormType === 'ADD'"
        :repositoryMenuForm="repositoryMenuForm"
        :visible="showDrawer"
        @cancel="handleFormCancel"
        @success="handleSuccess"
      ></knowledge-group-form>
      <knowledge-group-copy-form
        v-else-if="konwledgeFormType === 'COPY' || konwledgeFormType === 'TMP_COPY'"
        :repositoryMenuForm="repositoryMenuForm"
        :visible="showDrawer"
        :oldGroup="initFormValues"
        :disabledCopy="konwledgeFormType === 'TMP_COPY'"
        @cancel="handleFormCancel"
        @success="handleSuccess"
      ></knowledge-group-copy-form>
      <knowledge-group-edit-form
        v-else-if="konwledgeFormType === 'EDIT'"
        :repositoryMenuForm="repositoryMenuForm"
        :visible="showDrawer"
        :id="initFormValues.id"
        @cancel="handleFormCancel"
        @success="handleSuccess"
      ></knowledge-group-edit-form>
    </el-drawer>
    <el-drawer class="batch-drawer" title="批量修改问答" :visible.sync="showBatchEditFiles">
      <BatchEditFiles
        @uploadSuccess="uploadEditSuccess"
        @closeDrawer="showBatchEditFiles = false"
        :batchEditGroupNames="batchEditGroupNames"
      ></BatchEditFiles>
    </el-drawer>
    <manage-repos-list
      :visible="manangeReposVisible"
      @copy="handleTmpCopy"
      @close="manangeReposVisible = false"
    ></manage-repos-list>
  </div>
  <!-- </div> -->
</template>

<script>
import bus from '../../common/bus';
import draggable from 'vuedraggable';
import { updateKnowledgeGroup } from '../../api/knowledge';
import moment from 'moment';
import BatchEditFiles from './BatchEditFiles.vue';
import ManageReposList from '../../components/ManageReposList';
import KnowledgeGroupForm from '../../components/KnowledgeGroupForm/Add';
import KnowledgeGroupCopyForm from '../../components/KnowledgeGroupForm/Copy';
import KnowledgeGroupEditForm from '../../components/KnowledgeGroupForm/Edit';

export default {
  name: 'basetable',
  components: {
    draggable,
    BatchEditFiles,
    ManageReposList,
    KnowledgeGroupForm,
    KnowledgeGroupCopyForm,
    KnowledgeGroupEditForm,
  },
  data() {
    return {
      checkAll: false,
      tableLoading: true,
      select_word: '',
      itemActive: 0,
      height: 500,
      tableHeight: 300,
      cur_page: 1,
      repositoryData: [],
      removeTypeName: '',
      moveItemName: '',
      moveItemId: '',
      moveItemNameTitle: '',
      multipleSelection: [],
      oldRepositoryMenu: [],
      // creatFAQVisible:false,
      // delItemsVisible:false,
      moveItemsVisible: false,
      removeTypeVisible: false,
      delVisible: false,
      activeName: 'first',
      moveRepositoryMenu: [],
      addGroupIndex: 1,
      pagination: {
        show: true,
        total: 0,
        pageIndex: 1,
        pageSize: 20,
      },
      //   repositoryMenu: [
      // {
      //     groupName:"未分类",
      //     id:'未分类',
      //     type:1,
      //     value:2,
      //     isEdit:false,
      //     show:false
      // },
      //   ],
      creatFAQVForm: {
        questionContent: '',
        questionContentOther: [
          {
            name: '相似问题',
            value: '',
          },
        ],
        // region:'',
        creatFAQOptions: [],
        answerContent: '',
      },
      // creatFAQVRules: {
      //     questionContent: [
      //         { required: true, message: '请输入主问题', trigger: 'blur' }
      //     ],
      //     answerContent: [
      //         { required: true, message: '请输入回答内容', trigger: 'blur' }
      //     ]
      // },
      isNewFile: false,
      atchKnow: {
        excelPathTip: '',
        errorMessage: '',
        excelPath: '',
        filePath: '',
        filePathNew: '',
        excelPathTipNew: '',
        excelPathNew: '',
      },

      upload_img_index: -1,
      correctArry: [],
      atchKnowRules: {
        filePath: [{ required: true, message: '请上传知识问答Excel数据！', trigger: 'change' }],
      },

      listOfPageData: [],
      // isSubCollapse:false,
      typeListData: [],
      addGroupVisible: false,
      addGroupForm: {},
      addGroupFormRules: {
        groupName: [{ required: true, message: '输入知识库名称', trigger: 'blur' }],
      },
      modifyGroupVisible: false,
      modifyGroupForm: {
        groupName: '',
        id: '',
      },
      modifyGroupFormRules: {
        groupName: [{ required: true, message: '输入知识库名称', trigger: 'blur' }],
      },
      knowledgeCurrent: '',
      knowledgeTypeListCurrent: '',
      delItemsVisible: false,
      tabItem: 'a',
      groupId: '',
      searchType: '',
      queryKey: '',
      sortMethod: [
        {
          label: '更新时间顺序排列',
          value: 'asc',
        },
        {
          label: '更新时间倒序排列',
          value: 'desc',
        },
      ],
      sortMethodResult: '',
      showDrawer: false,
      editKnowleageForm: {
        groupName: '',
        knowledgeTypeId: '',
        useTemplate: false,
        knowledgeTemplates: [],
        referenceType: 0,
        relatedType: 0,
      },
      editKnowleageFormRules: {
        groupName: { required: true, message: '请输入知识库名称', trigger: 'blur' },
      },
      deleteSingleKnowleage: null,
      drawerTitle: '编辑知识库',
      deleteItemsVisible: false,
      showBatchEditFiles: false,
      batchEditGroupNames: [],
      manangeReposVisible: false,
      initFormValues: {},
      konwledgeFormType: '',
    };
  },
  created() {
    // 计算table 高度
    var clintHeight = document.documentElement.clientHeight;
    // this.height = clintHeight - 240;
    this.tableHeight = clintHeight - 260;
    // 距离头部

    bus.$emit('contentTop', false);

    // bus.$on('knowledgeSteps',(res)=>{
    //     if(res && res==1){
    //         this.tabItem = 'a';
    //     }
    // });

    this.id = this.$route.params.id;

    // if (this.$store.getters.getKnowledgeData) {
    //   this.repositoryMenu = this.$store.getters.getKnowledgeData;
    // }

    this.queryKnowledgeGroupListOfPage();

    // 打开知识库模版弹窗
    bus.$on('manangeReposVisible', () => {
      this.manangeReposVisible = true;
    });
  },
  computed: {
    repositoryMenuForm() {
      return this.repositoryMenu.map(item => {
        return { typeName: item.typeName, id: item.id };
      });
    },
    repositoryMenu() {
      return this.$store.getters.getKnowledgeData || [];
    },
    knowledgeFormTitle() {
      switch (this.konwledgeFormType) {
        case 'COPY':
        case 'TMP_COPY':
          return '复制知识库';
        case 'ADD':
          return '新建知识库';
        case 'EDIT':
          return '编辑知识库';
        default:
          return '';
      }
    },
  },
  methods: {
    uploadEditSuccess() {
      this.showBatchEditFiles = false;
      this.$message.success('批量修改成功');
    },
    handleCheckAllChange(val) {
      if (val) {
        this.multipleSelection = this.listOfPageData.map(item => item.id);
      } else {
        this.multipleSelection = [];
      }
    },
    handleDropdown(command) {
      switch (command) {
        case 'export':
          this.exportKnowleageList();
          break;
        case 'move':
          this.moveKnowleageList();
          break;
        case 'edit':
          if (this.multipleSelection.length === 0) {
            this.$message.info('请勾选知识库!');
            return;
          }
          this.showBatchEditFiles = true;
          this.batchEditGroupNames = this.listOfPageData
            .filter(({ id }) => this.multipleSelection.indexOf(id) >= 0)
            .map(({ groupName }) => groupName);
          break;
        case 'delete':
          this.deleteKnowleageListAction();
          break;
        case 'deploy':
          this.deployKnowleageList();
          break;
      }
    },
    dropMultipleSelection() {
      this.multipleSelection = [];
    },
    deployKnowleageList() {
      $.post(this.$baseUrl + 'knowledge/batchPublishKnowledgeGroup.json', JSON.stringify(this.multipleSelection)).then(
        res => {
          if (res.resultMessageEnum == '0000') {
            this.$message.success('发布成功');
            this.dropMultipleSelection();
            this.queryKnowledgeGroupListOfPage();
          } else {
            this.$message.error('发布失败');
          }
        },
      );
    },
    deleteKnowleageListAction() {
      if (this.multipleSelection.length === 0) {
        this.$message.info('请勾选知识库!');
        return;
      }
      this.deleteItemsVisible = true;
    },
    /**
     * 批量删除知识库
     */
    deleteKnowleageList() {
      this.deleteItemsVisible = false;
      $.post(this.$baseUrl + 'knowledge/removeKnowledgeGroupList.json', JSON.stringify(this.multipleSelection)).then(
        res => {
          if (res.resultMessageEnum == '0000') {
            this.$message.success('删除成功');
            this.dropMultipleSelection();
            this.queryKnowledgeGroupListOfPage();
          } else {
            this.$message.error('删除失败');
          }
        },
      );
    },
    /**
     * 批量导出知识库
     */
    exportKnowleageList() {
      if (this.multipleSelection.length === 0) {
        this.$message.info('请勾选知识库!');
        return;
      }
      $.post(
        this.$baseUrl + 'knowledge/batchExportKnowledgeExcelFile.json',
        JSON.stringify(this.multipleSelection),
      ).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.multipleSelection = [];
          window.location.href = this.$baseUrl + 'file/downloadFile.html?filePath=' + res.returnObject.filePath;
          this.$message.success('导出成功');
        } else {
          this.$message.error('导出失败');
        }
      });
    },
    saveFile(filePath) {
      fetch(this.$baseUrl + 'file/downloadFile.json' + '?filePath=' + filePath)
        .then(res => res.blob())
        .then(blob => {
          var url = window.URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = `知识库列表${moment().format('YYYY-MM-DD HH:mm:SS')}.xlsx`;
          document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
          a.click();
        });
    },
    submitForm(formData) {
      if (this.drawerTitle === '新增知识库') {
        return;
      }
      const payload = {
        groupName: formData.groupName,
        id: formData.id,
        knowledgeTypeId: formData.knowledgeTypeId,
      };
      updateKnowledgeGroup(payload)
        .then(({ data }) => {
          if (data.resultMessageEnum == '0000') {
            this.showDrawer = false;
            this.queryKnowledgeGroupListOfPage();
          } else {
            this.$message.error(data.errorInfoList[0].errorMessage);
          }
        })
        .catch(e => {
          this.$message.error('其他错误！');
        });
    },
    /**
     * 点击新增知识库
     */
    addGroupAction() {
      this.konwledgeFormType = 'ADD';
      this.showDrawer = true;
    },
    handleEditClick(part) {
      this.initFormValues = {
        id: part.id,
      };
      this.showDrawer = true;
      this.konwledgeFormType = 'EDIT';
    },
    handleCopyClick(part) {
      this.initFormValues = {
        groupName: part.groupName,
        knowledgeTypeId: part.knowledgeTypeId,
        id: part.id,
      };
      this.showDrawer = true;
      this.konwledgeFormType = 'COPY';
    },
    handleTmpCopy(v) {
      this.initFormValues = {
        id: v.id,
        groupName: v.groupName,
        knowledgeTypeId: v.knowledgeTypeId,
      };

      this.showDrawer = true;
      this.konwledgeFormType = 'TMP_COPY';
    },
    sortAction(sort) {
      if (sort === 'asc') {
        this.listOfPageData.sort((a, b) => {
          return (
            a.editTime
              .replace(/-/g, '')
              .replace(/:/g, '')
              .replace(' ', '') -
            b.editTime
              .replace(/-/g, '')
              .replace(/:/g, '')
              .replace(' ', '')
          );
        });
      } else {
        this.listOfPageData.sort((a, b) => {
          return (
            b.editTime
              .replace(/-/g, '')
              .replace(/:/g, '')
              .replace(' ', '') -
            a.editTime
              .replace(/-/g, '')
              .replace(/:/g, '')
              .replace(' ', '')
          );
        });
      }
    },
    table(row, index) {
      return row.itemUpdateFlag == 0;
    },
    handleConfig(row) {
      // this.knowledgeCurrent = row;
      // this.tabItem = 'b';
      // localStorage.setItem('repositoryListIndex',this.itemActive);

      this.$store.dispatch('setknowledgeList', row.groupName);
      this.$router.push(`/repository/sub/${row.id}/${row.groupName}`);
    },
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.queryKnowledgeGroupListOfPage();
    },
    handleSelectionChange() {},
    sortChange(column) {
      let flag = true;
      if (column.order == 'ascending') {
        flag = true;
      } else {
        flag = false;
      }
      this.sortList = [
        {
          propertyName: column.prop,
          ascendingFlag: flag,
        },
      ];
      this.queryKnowledgeGroupListOfPage();
    },
    // 查询知识库名称(问答对分组)翻页列表
    queryKnowledgeGroupListOfPage(item, index) {
      // this.tabItem = 'a'
      let params = {
        currentPage: this.cur_page - 1,
        pageSize: this.pagination.pageSize,
        templateType: 2,
      };
      this.tableLoading = true;

      if (this.id == 'unclassified') {
        params.typeId = '';
        params.searchType = 1;
      } else {
        params.typeId = this.id;
        params.searchType = 2;
      }

      let select_word = this.select_word;
      if (select_word) {
        params.queryKey = select_word;
      }
      if (this.sortList) {
        params.sortList = this.sortList;
      }

      $.post(this.$baseUrl + 'knowledge/queryKnowledgeGroupListOfPage.json', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          let data = res.returnObject && res.returnObject.recordList;
          if (data) {
            if (typeof index != 'undefined') {
              this.itemActive = index;
            }
            // 记录当前分类数据
            if (item) {
              if (item == 'unclassified') {
                this.id = 'unclassified';
                this.activeGroupName = '未分类';
              } else {
                this.id = item.id;
                this.activeGroupName = item.typeName;
              }
            }
            this.listOfPageData = data;
          }
          let moveRepositoryMenu = [];
          // 如果当前为 未分类 分组

          if (this.id == 'unclassified' || !this.repositoryMenu.length) {
            moveRepositoryMenu = this.repositoryMenu;
          } else {
            this.repositoryMenu.forEach(el => {
              if (el.id != this.id) {
                moveRepositoryMenu.push(el);
              }
            });
          }

          this.moveRepositoryMenu = moveRepositoryMenu;

          this.pagination.total = res.returnObject.totalNumber;
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }

        this.tableLoading = false;
      });
    },
    handleFormCancel() {
      this.showDrawer = false;
      this.$nextTick(() => this.resetKnowledgeForm());
    },
    handleSuccess() {
      this.showDrawer = false;
      this.$message({
        message: `${this.knowledgeFormTitle}成功！`,
        type: 'success',
      });
      this.$nextTick(() => this.resetKnowledgeForm());
      this.queryKnowledgeGroupListOfPage();
    },
    // 删除知识库名称(问答对分组)
    removeKnowledgeGroup() {
      var params = {
        groupName: this.addGroupForm.groupName,
        knowledgeTypeId: this.id,
      };
      $.post(this.$baseUrl + 'knowledge/removeKnowledgeGroup.json?', JSON.stringify(params)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.queryKnowledgeGroupListOfPage();
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },

    handleModifyGroup(row) {
      this.modifyGroupForm.groupName = row.groupName;
      this.modifyGroupForm.id = row.id;
      this.modifyGroupVisible = true;
    },
    // 修改知识库名称(问答对分组)
    modifyKnowledgeGroup() {
      var params = {
        groupName: this.modifyGroupForm.groupName,
        id: this.modifyGroupForm.id,
      };

      this.$refs['modifyGroupForm'].validate(valid => {
        $.post(this.$baseUrl + 'knowledge/modifyKnowledgeGroup.json?', JSON.stringify(params)).then(res => {
          if (res.resultMessageEnum == '0000') {
            this.modifyGroupVisible = false;
            this.queryKnowledgeGroupListOfPage();
          } else {
            this.$message.error(res.errorInfoList[0].errorMessage);
          }
        });
      });
    },
    search() {
      this.cur_page = 1;
      this.pagination.total = 0;
      this.queryKnowledgeGroupListOfPage();
    },
    // 搜索框为空时
    searchChange(val) {
      if (!val) {
        this.queryKnowledgeGroupListOfPage();
      }
    },
    // 移动分类
    handleCommand(command) {
      let obj = {};
      obj = this.moveRepositoryMenu.find(item => {
        return item.id === command;
      });

      this.moveItemName = obj ? obj.typeName : '未分类';
      this.moveItemId = obj ? obj.id : null;

      this.moveItemNameTitle = `移动到“${this.moveItemName}”`;
      if (this.multipleSelection.length) {
        this.moveItemsVisible = true;
      } else {
        this.$message.error('请选择要移动的知识库!');
      }
    },
    // 重新设置知识库名称（问答对分组）顺序
    moveKnowledgeGroup() {
      let list = [];
      this.multipleSelection.forEach(el => {
        list.push(el);
      });
      let data = {
        newTypeId: this.moveItemId,
        knowledgeGroupIdList: list,
      };
      $.post(this.$baseUrl + 'knowledge/moveKnowledgeGroup.json', JSON.stringify(data)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.multipleSelection = [];
          this.queryKnowledgeGroupListOfPage();
          this.$message.success('移动成功！');
          this.moveItemsVisible = false;
        } else {
        }
      });
    },
    // 确认移动
    moveKnowledgeItem() {
      let list = [];
      this.multipleSelection.forEach(el => {
        list.push(el.id);
      });
      let data = {
        newGroupId: this.moveItemId,
        knowledgeItemIdList: list,
      };
      $.post(this.$baseUrl + 'knowledge/moveKnowledgeItem.json', JSON.stringify(data)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.multipleSelection = [];
          this.queryKnowledgeGroupListOfPage();
          this.$message.success('移动成功！');
          this.moveItemsVisible = false;
        } else {
        }
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除单个问答
    deletItem(item) {
      this.delVisible = true;
      this.delActiveItemId = item.id;
    },
    // 确定删除多个列表
    handleDelItems(id) {
      if (id) {
        this.deleteSingleKnowleage = id;
        this.delItemsVisible = true;
      } else if (this.multipleSelection.length) {
        this.delItemsVisible = true;
      } else {
        this.$message.error('请选择要删除的FAQ!');
      }
    },
    removeKnowledgeGroupList() {
      //   let data = [];
      //   this.multipleSelection.forEach(el => {
      //     data.push(el.id);
      //   });
      let req = [];
      // 如果有id则是删除单个
      if (this.deleteSingleKnowleage) {
        req.push(this.deleteSingleKnowleage);
      } else {
        req = this.multipleSelection;
      }
      $.post(this.$baseUrl + 'knowledge/removeKnowledgeGroupList.json', JSON.stringify(req)).then(res => {
        if (res.resultMessageEnum == '0000') {
          this.delItemsVisible = false;
          this.multipleSelection = [];

          this.queryKnowledgeGroupListOfPage();
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    //知识库发布
    publishKnowledgeGroup(index, row) {
      let params = {
        groupId: row.id,
      };
      $.post(this.$baseUrl + 'knowledge/publishKnowledgeGroup.json?groupId=' + row.id).then(res => {
        if (res.resultMessageEnum == '0000') {
          // this.listOfPageData.splice(index,1)
          this.listOfPageData[index].itemUpdateFlag = 0;
          this.$message.success('发布成功');
        } else {
          this.$message.error(res.errorInfoList[0].errorMessage);
        }
      });
    },
    goGeneral() {
      this.$router.push('/generalknowledge');
    },
    resetKnowledgeForm() {
      this.initFormValues = {};
      this.konwledgeFormType = '';
    },
  },
  watch: {
    $route: function(to, from) {
      this.id = this.$route.params.id;
      this.multipleSelection = [];
      this.queryKnowledgeGroupListOfPage();
    },
    addGroupVisible(val) {
      if (!val) {
        this.$refs['addGroupForm'].resetFields();
      }
    },
    modifyGroupVisible(val) {
      if (!val) {
        this.$refs['modifyGroupForm'].resetFields();
      }
    },
  },
  destroyed() {
    // bus.$emit('contentTop', false);
  },
};
</script>

<style scoped lang="less">
.content-head {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
}
.sub-header {
  padding-left: 20px;
}
.handle-input {
  width: 240px;
  display: inline-block;
}
.faqUpload {
  padding: 30px 20px;
  .el-icon-question {
    font-size: 18px;
    color: #919fa9;
  }
  .red {
    color: #ff0000;
  }
  .blue {
    color: #fea200;
  }
  .updload-list-box {
    padding: 40px 0 30px 40px;
  }
  .el-button {
    width: 88px;
    // margin:40px 0 30px 40px;
  }
}
.pagination {
  padding: 20px 0 10px;
}
.repository-menu {
  width: 100%;
  overflow-y: auto;
  position: absolute;
  top: 46px;
  bottom: 10px;
}
.card-group {
  flex-wrap: wrap;
  font-size: 14px;
  .card-item {
    margin-bottom: 10px;
  }
  padding: 20px;
  .time {
    font-size: 12px;
    margin-top: 10px;
    color: #999;
  }

  .operation-buttons {
    margin-top: 10px;
    i {
      cursor: pointer;
      font-size: 16px;
      margin: 0 2px;
      padding: 4px;
      border-radius: 2px;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  }

  .edit {
    color: #4e8ff9;
  }
}
.right-menu-box {
  z-index: 2;
  .right-menu-item {
    display: inline-block;
  }
  .el-icon--right {
    margin-left: 0;
  }
}
.drawer-form {
  padding: 0 24px 24px;
}
</style>

<style lang="less">
.repository-card {
  .card-checkbox {
    width: 100%;
    .el-checkbox__label {
      width: 100%;
      padding-left: 0;
      .knowledge-image {
        width: 100%;
      }
    }
  }
}
.card-group {
  .el-card {
    position: relative;
    .el-checkbox__input {
      position: unset;
    }
    .el-checkbox__inner {
      position: absolute;
      top: 20px;
      left: 20px;
    }
  }
  .el-checkbox-group {
    font-size: unset;
  }
}
.drawer-form {
  .el-select {
    display: block;
  }
  .form-buttons {
    margin-top: 30px;
  }
  .el-select > .el-input {
    display: inline-block;
  }
}

.el-icon-edit-outline {
  cursor: pointer;
}

.drawer-form-scroll-warp {
  padding: 24px 40px 24px 24px;
}
.drawer-form-scroll {
  .el-textarea__inner {
    min-height: 100px !important;
  }
  .form-item-keywords {
    .el-form-item__label {
      float: none;
    }
  }
}
.batch-drawer {
  .el-drawer {
    padding: 0 20px;
  }
}

.custom-form-item {
  .el-form-item__label {
    border-left: 4px solid #4e8ff9;
    padding: 0 0 0 8px;
    line-height: 1;
    margin: 8px 0;
  }
}

.knowleage-reference-radio-group {
  display: flex;
  align-items: flex-start;
  > div:first-child {
    margin-right: 30px;
  }
}

.el-form-item__label.action-label {
  display: flex;
  justify-content: space-between;
}
</style>
