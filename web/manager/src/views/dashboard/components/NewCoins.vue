<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts'
  require('echarts/theme/macarons')
  import { debounce } from '@/utils'
  import { coinRoport } from '../api'
  const animationDuration = 4000

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
        default: '300px'
      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.initChart()
      this.__resizeHanlder = debounce(() => {
        if (this.chart) {
          this.chart.resize()
        }
      }, 100)
      window.addEventListener('resize', this.__resizeHanlder)
    },
    created() {
      this.fetchData()
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      window.removeEventListener('resize', this.__resizeHanlder)
      this.chart.dispose()
      this.chart = null
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
          tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: 10,
            left: '2%',
            right: '2%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value',
            axisTick: {
              show: false
            }
          }],
          series: [
            {
              name: '游戏币',
              stack: 'vistors',
              type: 'bar',
              label: labelOption,
              animationDuration
            },
            {
              name: '充电币',
              stack: 'vistors',
              type: 'bar',
              label: labelOption,
              animationDuration
            },
            {
              name: '注册币',
              stack: 'vistors',
              type: 'bar',
              label: labelOption,
              animationDuration
            }
          ]
        })
      },
      fetchData() {
        coinRoport().then(res => {
          var xAxios = res.data.map((v) => {
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
          var chongdianbi = res.data.map(v => {
            return v.Count.ChongDianBi
          })
          var yxb = res.data.map(v => {
            return v.Count.GameCoin
          })
          this.chart.setOption({
            xAxis: [{
              data: xAxios
            }],
            series: [{
              data: yxb
            }, {
              data: chongdianbi
            }]
          })
        })
      }
    }
  }
</script>
