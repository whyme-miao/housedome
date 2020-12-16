<template>
    <!-- 
        为ECharts准备一个具备大小（宽高）的Dom
        ref添加属性元素，
    -->
    <div id="main" style="height:400px;" ref="echart"></div>
</template>

<script>
    //引入echarts
	import echarts from 'echarts'
    export default {
        data() {
            return {
                // 指定图表的配置项和数据
                option : {
                    title: {
                        text: '公司员工分布情况'
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    color: ['#3398DB'],
                    legend: {
                        data:['数量'],
                    },
                    xAxis: {
                        data: ["总员工","临时员工","正式员工"]
                    },
                    yAxis: {},
                    series: [{
                        name: '数量',
                        type: 'bar',
                        data: [],
                        barWidth: 100
                    }]
                },
                totolNume: 0,
                Tworker: 0,
                Fworker:0
            }
        },
        methods: {
            // 获取员工列表
            async getEmployeeList() {
                const { data : res} = await this.$http.get('employee')
                this.totolNume = res.result.length
                for(let i = 0; i < res.result.length; i++) {
                    if(res.result[i].section === "正式工") {
                        this.Tworker++
                    }else {
                        this.Fworker++
                    }
                }
                console.log(res.result);
                this.push(this.totolNume)
                this.push(this.Tworker)
                this.push(this.Fworker)
            },
            getEcharts() {
                // $refs获取元素
                let echart = echarts.init(this.$refs.echart)  // 基于准备好的dom，初始化echarts实例
                // 使用刚指定的配置项和数据显示图表
                echart.setOption(this.option,true);
                this.myEchrt = echart            
            },
            push (...args) {
                this.option.series[0].data.push(...args)
                this.myEchrt.setOption(this.option)
            },
        },
        // watch:{
        //     //观察option的变化
        //     "this.option": {
        //         handler() {
        //             this.getEcharts()
        //         }
        //     },
        //     deep: true
        // },
       
        created() {
             this.getEmployeeList()
        },
        mounted() {
           
            this.getEcharts()
        }
    }
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类

</style>