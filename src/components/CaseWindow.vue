<template>
  <div class="case-window py-3 px-4">
    <div class="content-holder flex flex-col w-full h-full py-5">

        <p class='w-full text-center value font-bold'>
          {{formatedValue || 0}}
        </p>
        <div class="text w-full text-center">
          <p><slot></slot></p>
        </div>

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
    if(!props.value) return null
    return new Intl.NumberFormat('en-US').format(props.value)
    })

    return {
      formatedValue
    }
  }


}
</script>
