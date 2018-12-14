<template>
  <div class="app-control-input">
    <label class="app-control-input__label"><slot /></label>
    <input
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      class="app-control-input__input"
      @input="$emit('input', $event.target.value)">
    <text-area
      v-if="controlType === 'textarea'"
      :value="value"
      rows="10"
      class="app-control-input__textarea"
      @input="$emit('input', $event.target.value)"/>
  </div>
</template>

<script>
export default {
  name: 'AppInputControl',
  props: {
    controlType: {
      type: String,
      default: 'input'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped lang="scss">
.app-control-input__input,
.app-control-input__textarea {
  // border: 1px solid $inputcontrol-border-color;
  border: none;
  background-color: $inputcontrol-bg-color;
  padding: 10px 8px;
  margin: 20px 0;
  width: 100%;
}

.app-control-input__label {
  display: block;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0;
}

.input-control input,
.input-control textarea {
  display: block;
  width: 100%;
  box-sizing: border-box;
  font: inherit;
  border: 1px solid #ccc;
  padding: 5px;
}

.input-control input:focus,
.input-control textarea:focus {
  background-color: #eee;
  outline: none;
}
</style>
