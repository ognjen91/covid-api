import { useRoute } from 'vue-router'
import { ref, computed } from "vue";


export default function(){
  const currentLocale = computed(()=> useRoute().params.locale || 'sr')

  return {
    currentLocale
  }
}
