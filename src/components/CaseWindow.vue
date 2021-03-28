<template>
  <div class="case-window py-3 px-4">
    <div class="content-holder flex flex-col w-full h-full py-5 default-shadow">

        <p class='w-full text-center value font-bold font-heading'>
          <!-- {{formatedValue || 0}} -->
          <span v-if="value">
            <CountTo :number="value" :time="1000" />
          </span>
          <span v-else>0</span>
        </p>
        <div class="text w-full text-center">
          <p class='text-darkBlue'><strong><slot></slot></strong></p>
        </div>

    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import CountTo from './CountTo.vue'

export default {
  components : {
    CountTo
  },

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
