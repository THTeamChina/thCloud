<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons') // echarts theme
  import { debounce } from '@/utils'

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '450px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Array
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.fetchItems(val)
          this.chart.resize()
        }
      }
    },
    methods: {
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        var labelOption = {
          normal: {
            show: true,
            rotate: 90,
            align: 'left',
            verticalAlign: 'middle',
            position: 'insideBottom',
            distance: 15,
            formatter: '{c}',
            fontSize: 14,
            rich: {
              name: {
                textBorderColor: '#fff'
              }
            }
          }
        }
        this.chart.setOption({
          grid: [
            {
              left: 50,
              right: 10,
              top: 30,
              height: 200
            },
            {
              top: 260,
              left: 50,
              right: 10,
              bottom: '15%'
            }
          ],
          xAxis: [{
            type: 'category',
            data: [],
            boundaryGap: false,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true
            }
          },
          {
            type: 'category',
            gridIndex: 1,
            data: [],
            boundaryGap: false,
            axisTick: {
              show: false,
              alignWithLabel: true
            },
            axisLabel: {
              show: true
            }
          }],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: [{
            gridIndex: 0,
            axisTick: {
              show: false
            }
          },
          {
            gridIndex: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }],
          series: [{
            name: '新增', itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            smooth: true,
            type: 'line',
            data: [],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          },
          {
            name: '减少',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: [],
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          },
          {
            name: '总计',
            type: 'bar',
            label: labelOption,
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: []
          }]
        })
      },
      fetchItems(items) {
        const dates = items.map(v => {
          var dt = new Date(v.Date)
          switch (dt.getDay()) {
            case 0:
              return '周日'
            case 1:
              return '周一'
            case 2:
              return '周二'
            case 3:
              return '周三'
            case 4:
              return '周四'
            case 5:
              return '周五'
            case 6:
              return '周六'
          }
        })
        this.chart.setOption({
          xAxis: [
            {
              data: dates
            },
            {
              data: dates
            }]
        })
        var inValues = items.map(i => { return i.Data.In })
        var outValues = items.map(i => { return i.Data.Out })
        var totalValues = items.map(i => { return i.Data.Total })
        if (outValues.every(v => { return v !== undefined })) {
          this.chart.setOption({
            legend: [{
              data: ['新增', '减少']
            }]
          })
        } else {
          this.chart.setOption({
            legend: [{
              data: ['新增']
            }]
          })
        }
        this.chart.setOption({
          series: [{
            data: inValues
          },
          {
            data: outValues
          },
          {
            data: totalValues
          }]
        })
      }
    }
  }
</script>
