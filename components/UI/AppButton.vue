<template>
  <b-button
    :class="btnStyle"
    v-bind="$attrs"
    :size="btnSize"
    class="b-button"
    v-on="$listeners"><slot /></b-button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    btnStyle: {
      type: String,
      default: ''
    },
    btnSize: {
      type: String,
      default: ''
    }
  }
}
</script>


<style scoped lang="scss">
.b-button {
  border-radius: 0;
  border: none;
  // padding: ;
}

.inverted {
  background-color: $white;
  color: $text-color;
  /* border: 1px solid transparent; */
}

.inverted:hover,
.inverted:active {
  // color: #ccc;
  background-color: darken($white, 15%);
  /* border: 1px solid transparent; */
}

.cancel {
  background-color: red;
  color: white;
  // border: 1px solid transparent;
}

.cancel:hover,
.cancel:active {
  background-color: salmon;
  // border: 1px solid transparent;
  color: white;
}
</style>
