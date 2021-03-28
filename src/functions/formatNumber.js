export default function(number, format='en-US'){
  if(typeof number !== 'number') return null
  return new Intl.NumberFormat(format).format(number)
}
