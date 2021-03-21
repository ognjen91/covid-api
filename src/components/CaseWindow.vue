<template>
  <div class="case-window flex flex-col">
    <p class='w-full text-center value font-bold'>
      {{formatedValue}}
    </p>
    <div class="text w-full text-center">
      <p><slot></slot></p>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props : {
    value : {
      Type : Number,
      required : true
    }
  },

  setup (props, context) {
    const formatedValue = computed(() => {
      // return props.value
    if(!props.value) return null
    return new Intl.NumberFormat('en-US').format(props.value)
    })

    return {
      formatedValue
    }
  }


}
</script>
