<!---
 --@author  PanFu
 --@data 2020-06-9:08
 --@description 页面管理
 --@version 1.0
--->
<template>
  <div class="pageMaking">
    <div class="pageMaking-container">
      <div class="pageMaking-header">
        <div class="pageMaking-header-min">清空</div>
      </div>

      <!--左边-->
      <div class="pageMaking-left">
        <div class="aside">
          <h5>基础字段</h5>
          <draggable
            :list="basicss"
            tag="ul"
            :options="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false
            }"
            :clone="clone"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <li class="list" v-for="(item, index) in basicss" :key="index">
              <i class="el-icon-s-grid"></i>{{ item.title }}
            </li>
          </draggable>
        </div>
        <div class="aside">
          <h5>高级字段</h5>
          <draggable
            :list="seniors"
            tag="ul"
            :options="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false
            }"
            :clone="clone"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <li class="list" v-for="(item, index) in seniors" :key="index">
              <i class="el-icon-s-grid"></i>{{ item.title }}
            </li>
          </draggable>
        </div>

        <div class="aside">
          <h5>布局字段</h5>
          <draggable
            :list="layout"
            tag="ul"
            :options="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghosts'
            }"
            :clone="clone"
            @end="handleMoveEnd()"
            @start="handleMoveStart"
            :move="handleMove"
          >
            <li class="list" v-for="(item, index) in layout" :key="index">
              <i class="el-icon-s-grid"></i>{{ item.name }}
            </li>
          </draggable>
        </div>
      </div>

      <!--左边 NED-->

      <!--中间内容模板-->
      <div class="pageMaking-min">
        <draggable
          v-model="list"
          class="pageMaking-list"
          :class="{ noData: list.length == 0 }"
          :options="{
            chosenClass: 'active',
            scroll: true,
            group: { name: 'people', pull: 'clone', put: true }
          }"
          handle=".handle"
          ghost-class="ghost"
          @end="onEnd"
          @add="onAdd"
          :move="move"
        >
          <template v-for="(element, index) in list">
            <template v-if="element.type == 'grid'">
              <div
                class="pageMaking-view-row"
                :class="{ on: isView == index }"
                @click="onMousedown(index)"
              >
                <div
                  class="col pageMaking-view"
                  v-for="(col, colIndex) in element.columns"
                >
                  <draggable
                    v-model="col.list"
                    :no-transition-on-drag="true"
                    v-bind="{
                      chosenClass: 'active',
                      group: 'people',
                      ghostClass: 'ghost',
                      animation: 200,
                      handle: '.drag-handle'
                    }"
                    @end="handleMoveEnd"
                    @add="handleWidgetColAdd($event, element, colIndex)"
                    class="col-list"
                  >
                    <div
                      v-for="(el, i) in col.list"
                      class="pageMaking-row-col"
                      :class="{ on: isLayout == i && colIndex == isColIndex }"
                      @click.stop="rowOnMousedown(colIndex, i)"
                    >
                      <!---这里定义好的模板 把ID对应显示-->
                      <h4>
                        {{ el.id }}----{{ i }}---isLayout:{{ isLayout }}----{{
                          isColIndex
                        }}
                      </h4>
                      <p>{{ el.title }}</p>
                      <!---NED 这里定义好的模板-->
                      <template v-if="isLayout == i && colIndex == isColIndex">
                        <div class="drag-handle">+</div>
                        <div class="view-action">
                          <i
                            class="el-icon-copy-document"
                            @click.stop="rowCopy(colIndex, element, i)"
                          ></i>
                          <i
                            class="el-icon-delete"
                            @click.stop="rowDel(colIndex, element, i)"
                          ></i>
                        </div>
                      </template>
                    </div>
                  </draggable>
                </div>

                <template v-if="isView == index">
                  <div class="handle">+</div>
                  <div class="view-action">
                    <i
                      class="el-icon-copy-document"
                      @click.stop="copy($event, index)"
                    ></i>
                    <i
                      class="el-icon-delete"
                      @click.stop="del($event, index)"
                    ></i>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div
                class="pageMaking-view"
                :class="{ on: isView == index }"
                @click="onMousedown(index)"
              >
                <!---这里定义好的模板 把ID对应显示-->
                <h3>{{ element.id }}</h3>
                <p>{{ element.title }}</p>
                <!---NED 这里定义好的模板-->

                <template v-if="isView == index">
                  <div class="handle">+</div>
                  <div class="view-action">
                    <i
                      class="el-icon-copy-document"
                      @click="copy($event, index)"
                    ></i>
                    <i class="el-icon-delete" @click="del($event, index)"></i>
                  </div>
                </template>
              </div>
            </template>
          </template>
        </draggable>
      </div>
      <!--中间内容模板 ned-->

      <!--右边-->
      <div class="pageMaking-right">
        <header class="pageMaking-right-header">
          <div
            class="config-tab"
            :class="{ active: index == isAttribute }"
            @click="attributeClick(index)"
            v-for="(itme, index) in attribute"
            :key="index"
          >
            {{ itme }}
          </div>
        </header>
        <template v-if="isAttribute == 0">
          <div class="pageMaking-box">
            <h5>字段标识</h5>
            <input type="text" placeholder="" class="input" v-model="key" />
            <h5>标题</h5>
            <input type="text" placeholder="" class="input" />
            <h5>宽度</h5>
            <input type="text" placeholder="100%" class="input" />
            <h5>操作属性</h5>
            <input type="text" placeholder="" class="input" />
          </div>
        </template>
        <template v-else>
          <div class="pageMaking-box">
            <h5>标签对齐方式</h5>
            <div class="radio-group">
              <div class="radio">左对齐</div>
              <div class="radio active">右对齐</div>
              <div class="radio">顶部对齐</div>
            </div>
            <h5>组件尺寸</h5>
            <div class="radio-group">
              <div class="radio">medium</div>
              <div class="radio active">small</div>
              <div class="radio">mini</div>
            </div>
          </div>
        </template>
      </div>
      <!--右边 ned-->
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "pageMaking",
  components: {
    draggable
  },
  props: {
    layoutFields: {
      //册格布局
      type: Array,
      default: () => ["grid"]
    }
  },
  computed: {},
  data() {
    return {
      attribute: ["字段属性", "表单属性"],
      isAttribute: 0,
      isView: 0,
      isLayout: 0,
      isColIndex: 0, //坐标
      layout: [
        {
          name: "布局1:1",
          id: 1,
          type: "grid",
          columns: [
            { title: "例表1", id: 1, list: [] }, //list为添加的数据
            { title: "例表2", id: 2, list: [] }
          ]
        }
      ],
      basicss: [
        { title: "单行文本", type: "text" },
        { title: "多行文本", type: "rowtxte" },
        { title: "计数器", type: "scaler" },
        { title: "单选框组", type: "radioBoxGroup" },
        { title: "多选框组", type: "boxGroup" },
        { title: "时间选择", type: "timeSelection" },
        { title: "日期选择", type: "dateSelection" },
        { title: "文字", type: "writing" }
      ],
      seniors: [
        { title: "自定义区域", type: "text" },
        { title: "自定义组件", type: "text" },
        { title: "文件", type: "text" },
        { title: "图片", type: "text" },
        { title: "编辑器", type: "text" },
        { title: "级联选择器", type: "text" },
        { title: "子表单", type: "text" }
      ],
      list: [], //拖转数据
      cloneData: "", //添加的数据
      key: ""
    };
  },
  methods: {
    handleMoveEnd(evt) {},
    handleMoveStart() {},
    handleMove() {
      return true;
    },
    //回调数据选择对应的模板
    clone: function(evt) {
      let data = evt;
      data.id =
        evt.type +
        "_" +
        Date.parse(new Date()) +
        "_" +
        Math.ceil(Math.random() * 99999);
      this.key = data.id;
      this.cloneData = data; //数据全部考过来
    },
    //添加数据完成
    onAdd(e) {
      const item = e.item;
      console.log(item);
      if (item.tagName !== "DIV") {
        //防止重复生成
        this.list.splice(e.newIndex, 0, this.cloneData); //取ID来对应模板
      }
      this.isView = e.newIndex;
    },
    //册格化添加数据完成
    handleWidgetColAdd($event, row, colIndex) {
      const item = $event.item;
      const newIndex = $event.newIndex;
      const oldIndex = $event.oldIndex;
      this.isColIndex = colIndex;
      this.isLayout = newIndex;
      this.isView = -1; //不选中
      console.log("是不是到这里==================");
      // 防止布局元素的嵌套拖拽
      if (row.type === "grid") {
        // 如果是列表中拖拽的元素需要还原到原来位置
        item.tagName === "DIV" &&
          row.splice(oldIndex, 0, row.columns[colIndex].list[newIndex]);
        row.columns[colIndex].list.splice(newIndex, 0, this.cloneData); //增加数据
        return false;
      }
    },
    //册格化按下
    rowOnMousedown(colIndex, i) {
      this.isView = -1;
      this.isColIndex = colIndex;
      this.isLayout = i;
      console.log("不执行这里才对的====================");
    },
    //删除内容
    del(e, index) {
      this.isView = index - 1 <= 0 ? 0 : index - 1;
      this.list.splice(index, 1);
    },
    //复制内容
    copy(e, index) {
      this.isView = index + 1;
      let array = this.list;
      //拼接函数(索引位置, 要删除元素的数量, 元素)
      array.splice(index, 0, this.list[index]);
    },
    //删格化复制内容
    rowCopy(colIndex, row, newIndex) {
      this.isLayout = newIndex + 1;
      this.isColIndex = colIndex;
      let array = row.columns[colIndex].list;
      //拼接函数(索引位置, 要删除元素的数量, 元素)
      array.splice(newIndex, 0, array[newIndex]);
    },
    //删格删除内容
    rowDel(colIndex, row, newIndex) {
      this.isColIndex = colIndex;
      this.isLayout = newIndex - 1 <= 0 ? 0 : newIndex - 1;
      row.columns[colIndex].list.splice(newIndex, 1);
    },
    //鼠标按下
    onMousedown(index) {
      this.isView = index;
    },
    //start ,end ,add,update, sort, remove 得到的都差不多
    onEnd(evt) {
      this.isView = evt.newIndex;
      var itemEl = evt.item; // dragged HTMLElement
    },
    move(evt, originalEvent) {
      //  console.log(evt)
      // console.log(originalEvent); //鼠标位置
    },
    //选择组件类型
    attributeClick(index) {
      this.isAttribute = index;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "css/pageMaking";
</style>
