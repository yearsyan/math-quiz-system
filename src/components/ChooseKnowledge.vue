<template>
    <el-tabs v-loading="loading" v-model="choosedSubject"  @tab-click="handleTabClick" >
    <el-tab-pane v-for="subject in subjects" v-bind:key="subject.id" v-bind:label="subject.name" v-bind:name="subject.short">
        <el-tree
        :data="subject.chapters"
        show-checkbox
        node-key="id"
        :props="defaultTreeProps"
        ref="tree"
        @check-change="handleNodeClick"
        >
        </el-tree>
    </el-tab-pane>
    <div class="go-quiz-botton">
        <el-button @click="exam" v-show="clickable">模拟考试</el-button>
        <el-button @click="getAllQuestion" v-show="clickable">刷题练习</el-button>
    </div>
  </el-tabs>
</template>

<script>

const subject_dict = { GS: '高等数学', XD: '线性代数', FB: '复变函数', 'GL': '概率论与数理统计'};
var knowledge_ids = {};

export default {
    methods: {
        // 模拟考试
        exam() {
            var _this = this;
            _this.loading = true;
            this.axios.post(
                'https://weneu.neuyan.com/quiz',
                {
                    action: 'getQuestion',
                    knowledgeList: Array.from(
                        _this.$refs.tree[this.page].getCheckedKeys().filter((value) => value > 999),
                        (value) => knowledge_ids[value]
                    )
                }
            ).then(function (resp) {
                return resp.data.data.questions
            }).then(function (questions) {
                let qid = 0;
                return Array.from(
                    questions.filter(() => Math.random() < 25/questions.length), // 随机选择一些题目,期望为25道
                    (question) => {
                        return {
                            id: qid++,
                            baseUrl: question.question.slice(0,-5),
                            ans: question.answer,
                            ansDetail: question.answerDetail
                        }
                    }
                )
            })
            .then(function (res) {
                _this.loading = false;
                _this.$router.push({
                    name: 'quiz',
                    params: {
                        questions: res
                    }
                })
            })
        },
        // 刷题练习
        getAllQuestion() {
            var _this = this;
            this.loading = true;
            this.axios.post(
                'https://weneu.neuyan.com/quiz',
                {
                    action: 'getQuestion',
                    knowledgeList: Array.from(
                        _this.$refs.tree[this.page].getCheckedKeys().filter((value) => value > 999),
                        (value) => knowledge_ids[value]
                    )
                }
            ).then(function (resp) {
                return resp.data.data.questions
            }).then(function (questions) {
                let qid = 0;
                return Array.from(
                    questions,
                    (question) => {
                        return {
                            id: qid++,
                            baseUrl: question.question.slice(0,-5),
                            ans: question.answer,
                            ansDetail: question.answerDetail
                        }
                    }
                )
            }).then(function (res) {
                _this.loading = false;
                _this.$router.push({
                    name: 'quiz',
                    params: {
                        questions: res
                    }
                })
            })
        },
        handleTabClick(tab) {
            this.page = tab.index;
        },
        // 判断是否有结点选中,如果有则显示按钮
        handleNodeClick() {
            let clickable = false;
            this.$refs.tree.forEach(
                (element) => {if(element.getCheckedKeys().length > 0)clickable=true}
            )
            this.clickable = clickable;
        }
    },
    created() {
        let _this = this;
        this.axios
        .post('https://weneu.neuyan.com/quiz',{action: 'list'})
        .then(function(resp) {
            return resp.data.data.questions;
        })
        .then(function (question_arr) {
            console.log(question_arr);
            let subject_id = 0;
            _this.choosedSubject = question_arr[0].subjectName;
            return Array.from(
                question_arr,
                (subject_content) => {
                    let chapter_id = 0;
                    return {
                        id: subject_id++,
                        name: subject_dict[subject_content.subjectName],
                        short: subject_content.subjectName,
                        chapters: Array.from(
                            subject_content.chapterList,
                            (chapter_content) => {
                                let knowledge_id = 0;
                                return {
                                    id: (subject_id+1)*100+(chapter_id++),
                                    label: chapter_content.chapterName,
                                    children: Array.from(
                                        chapter_content.knowledgeList,
                                        (knowledge_name) => {
                                            let kid = (subject_id+1)*1000+10*chapter_id+(knowledge_id++);
                                            knowledge_ids[kid] = knowledge_name;
                                            return {
                                                id: kid,
                                                label: knowledge_name
                                            }
                                        }
                                    )
                                }
                            }
                        )
                    }
                }
            )
        })
        .then(function (subject_res) {
            _this.subjects = subject_res;
            _this.loading = false;
        })
    },
    data() {
        return {
            page: 0,
            subjects: [],
            choosedSubject: '',
            defaultTreeProps: {
                children: 'children',
                label: 'label'
            },
            loading: true ,
            clickable: false
        }
    }
}
</script>

<style >
.go-quiz-botton {
    position: fixed;
    bottom: 10px;
}
</style>