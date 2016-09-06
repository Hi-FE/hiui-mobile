<template>
    <div class="filter-bar" id="filter-bar">
        <div class="sort" @click.stop="sort">
            <img class="i-exchange" :src="images.exchange">
        </div>
        <div class="filter-item"
             v-for="tab in cur_filter_data | limitBy count"
             @click="openWindow($index)">
            <p class="bar-item-title">{{ tab.tab_name }}</p>
            <p class="bar-item-content">
                <span :class="{ 'select-item' : select_text(tab) != '不限' }">{{ select_text(tab) }}</span>
                <icon :name="'i-arrow-down'" :color="'#333'"></icon>
                <img class="i-arrow-down" :src="images.arrow">
            </p>
        </div>
        <div class="more" @click="openWindow(0)" v-if="count==3">
            <img class="i-more" :src="images.more">
        </div>
    </div>
</template>
<style scoped>
    .filter-bar { display: flex; width : 100%; height : 53px; border-bottom : 1px solid #eaeaea; background-color : #fff; }
    .filter-bar .filter-item { flex: 1; padding : 13px 0 13px 4.5%; border-right : 1px solid #F1F1F1; }
    .filter-bar .bar-item-title { margin: 0; font-size : 10px; line-height : 1; color : #666; }
    .filter-bar .bar-item-content { margin: 0; font-size : 12px; line-height : 1; color : #2D3E50; padding-top : 4px; }
    .filter-bar .bar-item-content span { display: inline-block; max-width: 74%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; vertical-align : middle; }
    .filter-bar .bar-item-content .select-item { color : #f77; }
    .filter-bar .bar-item-content .i-arrow-down { width : 12px; height : 12px; vertical-align : middle; }
    .more, .sort { display: flex; align-items: center; padding: 0 5px; }
    .sort { border-right: 1px solid #f1f1f1; }
    .sort .i-exchange { width: 25px; transform: rotate(90deg); }
</style>
<script type="text/babel">
    export default {
        props: [ 'cur_filter_data' ],
        data: function() {
            return {
                images: {
                    arrow: require('../../assets/arrow-down.png'),
                    exchange: require('../../assets/exchange.png'),
                    more: require('../../assets/more.png')
                }
            }
        },
        computed: {
            count() {
                return this.cur_filter_data.length > 4 ? 3 : 4;
            }
        },
        methods  : {
            sort: function() {
                this.$dispatch('filter-sort');
            },
            openWindow : function(index) {
                var self = this;
                self.$dispatch('open-filter-window', index)
            },
            //当前已选中的文字字符串
//            select_text(tab) {
//                var text = '';
//                //单选
//                if (!tab.is_multiple_choice) {
//                    tab.content.map(item => {
//                        if (item.select) {
//                            text = item.content_name;
//                        }
//                        if (item.child) {
//                            item.child.map(child => {
//                                if (child.select) {
//                                    text = child.name;
//                                }
//                            });
//                        }
//                    });
//                }
//                else {
//                    tab.content.map(item => {
//                        if (item.select) {
//                            text += item.content_name;
//                        }
//                        if (item.child.length) {
//                            item.child.map(children => {
//                                if (children.select) {
//                                    text += children.name;
//                                }
//                            });
//                        }
//                    });
//                }
//                return text
//            }
            select_text(tab) {
                var text = '';
                //单选
                if (!tab.is_multiple_choice) {
                    for (var i = 0; i < tab.content.length; i++) {
                        //是否有toggle?
                        if (tab.content[i].toggle) {
                            for (var j = 0; j < tab.content[i].child.length; j++) {
                                if (tab.content[i].child[j].select) {
                                    text = tab.content[i].child[j].name;
                                    return text
                                }
                            }
                            //如果选项展开但是并没有子集选中,输出父级菜单
                            text = tab.content[i].content_name;
                            return text
                        }
                        //直到最后一个都没有toggle
                        if (i == tab.content.length - 1) {
                            for (var tl = 0; tl < tab.content.length; tl++) {
                                if (tab.content[tl].select) {
                                    text = tab.content[tl].content_name;
                                    return text
                                }
                            }
                        }
                    }
                }
                //多选
                else {
                    for (var i = 0; i < tab.content.length; i++) {
                        //是否有toggle?
                        if (tab.content[i].toggle) {
                            for (var j = 0; j < tab.content[i].child.length; j++) {
                                //toggle下有选中
                                if (tab.content[i].child[j].select) {
                                    text += tab.content[i].child[j].name;
                                    //return text
                                }
                            }
                            //如果选项展开但是并没有子集选中,输出父级菜单
                            text += tab.content[i].content_name;
                            return text
                        }
                        //直到最后一个都没有toggle,单级遍历
                        if (i == tab.content.length - 1) {
                            for (var tl = 0; tl < tab.content.length; tl++) {
                                if (tab.content[tl].select) {
                                    text += tab.content[tl].content_name;
                                    return text
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</script>