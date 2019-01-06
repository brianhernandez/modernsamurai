<template>
  <div class="app-control-input">
    <label class="app-control-input__label"><slot /></label>
    <!-- This needs to be refacted once we know Vee Validate better -->
    <!-- Need to dynamically set the v-validate attribute depending -->
    <!-- On the type of input field and validation rules needed -->
    <input
      v-if="controlType === 'input'"
      v-bind="$attrs"
      :value="value"
      :type="controlType"
      class="app-control-input__input"
      @input="$emit('input', $event.target.value)">
    <input
      v-validate="'required|email'"
      v-if="controlType === 'email'"
      v-bind="$attrs"
      :value="value"
      :class="['app-control-input__input', {inputError: errors.has(controlType)}]"
      :type="controlType"
      @input="$emit('input', $event.target.value)">
    <input
      v-validate="'required'"
      v-if="controlType === 'password'"
      ref="password"
      v-bind="$attrs"
      :value="value"
      :class="['app-control-input__input', {inputError: errors.has(controlType)}]"
      :type="controlType"
      @input="$emit('input', $event.target.value)">
    <input
      v-validate="'required|confirmed:password'"
      v-if="controlType === 'confirmPassword'"
      v-bind="$attrs"
      :value="value"
      :class="['app-control-input__input', {inputError: errors.has(controlType)}]"
      type="password"
      @input="$emit('input', $event.target.value)">
    <text-area
      v-if="controlType === 'textarea'"
      :value="value"
      :class="['app-control-input__textarea', {inputError: errors.has(controlType)}]"
      rows="10"
      @input="$emit('input', $event.target.value)"/>
    <span
      v-show="errors.has(controlType)"
      class="app-control-input__error">{{ errors.first(controlType) }}</span>
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
  margin: 20px 0 0;
  width: 100%;

  &.inputError {
    border: 1px solid red;
  }
}

.app-control-input__label {
  display: block;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 0;
  color: $white;
}

.app-control-input__error {
  color: #ff0000;
  font-size: 10px;
  display: block;
  text-align: left;
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
