<template>
  <span :class="{'count-value' : currentValue == number - conutMinus}">{{formatedValue}}</span>
</template>

<script>
  export default{
    props : {
      number : {
        Type : Number,
        required : true
      },
      time : {
        Type : Number,
        required : true
      },
      conutMinus : {
        Type : Number,
        required : false,
        default : 300
      }
    },

    data(){
      return {
        currentValue : this.number
      }
    },

    computed : {
      formatedValue(){
        if(!this.number) return null
        return new Intl.NumberFormat('en-US').format(this.currentValue)
      }
    },

    mounted(){
      this.currentValue = this.number > this.conutMinus? (this.number - this.conutMinus) : 0
        setInterval(()=>{
          if(this.currentValue < this.number) this.currentValue++
        }, 1)
    }
  }
</script>
