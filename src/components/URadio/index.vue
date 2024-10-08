<template>
  <view class="evan-radio" @click="onRadioClick">
    <slot v-if="$slots.icon" name="icon" />
    <template v-else>
      <uni-icons v-if="icon" :type="icon" :size="iconSize" :color="iconColor" />
      <view
        v-else
        class="evan-radio__inner"
        :class="['evan-radio__inner--' + shape]"
        :style="{
          width: iconSize + 4 + 'px',
          height: iconSize + 4 + 'px',
          backgroundColor: innerBackgroundColor,
          borderColor: innerBorderColor,
        }"
      >
        <uni-icons
          v-if="isChecked"
          type="checkmarkempty"
          :size="iconSize"
          :color="isDisabled ? '#c8c9cc' : '#fff'"
        />
      </view>
    </template>
    <text v-if="$slots.default" class="evan-radio__label" :style="mTitleStlye">
      <slot />
    </text>
  </view>
</template>

<script>
export default {
  name: "EvanRadio",
  props: {
    shape: {
      type: String,
      default: "round",
    },
    value: {
      type: [String, Number, Boolean],
      default: null,
    },
    label: {
      type: [String, Number, Boolean],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: null,
    },
    iconSize: {
      type: Number,
      default: 16,
    },
    primaryColor: {
      type: String,
      default: "#108ee9",
    },
    titleStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    preventClick: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["input", "change"],
  data() {
    return {
      currentValue: null,
    };
  },
  computed: {
    isGroup() {
      let parent = this.getParent();
      if (parent) {
        return true;
      }
      return false;
    },
    isDisabled() {
      if (this.isGroup) {
        return this.getParent().disabled || this.disabled;
      }
      return this.disabled;
    },
    mTitleStlye() {
      let titleStyle = Object.assign({}, this.titleStyle || {});
      let arr = Object.keys(titleStyle)
        .map((key) => {
          if (key === "color" && this.disabled) {
            return null;
          }
          return `${key}:${titleStyle[key]}`;
        })
        .filter((v) => v);
      return arr.join(";");
    },
    isChecked() {
      let parent = this.getParent();
      if (
        (this.isGroup && parent.value === this.label) ||
        (!this.isGroup && this.currentValue === this.label)
      ) {
        return true;
      }
      return false;
    },
    innerBackgroundColor() {
      if (this.isDisabled) {
        return "#ebedf0";
      }
      let parent = this.getParent();
      if (this.isChecked) {
        return this.primaryColor;
      }
      return "#fff";
    },
    innerBorderColor() {
      if (this.isDisabled) {
        return "#c8c9cc";
      }
      if (this.isChecked) {
        return this.primaryColor;
      }
      return "#c8c9cc";
    },
    iconColor() {
      if (this.isDisabled) {
        return "#ebedf0";
      }
      if (this.isChecked) {
        return this.primaryColor;
      }
      return "#c8c9cc";
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.currentValue = value;
      },
    },
  },
  created() {
    let parent = this.getParent();
    if (parent) {
      this.setValue(parent.value);
    }
  },
  methods: {
    // 获取EvanRadioGroup组件
    getParent() {
      let parent = this.$parent;
      if (parent) {
        let parentName = parent.$options.name;
        while (parentName !== "EvanRadioGroup") {
          parent = parent.$parent;
          if (parent) {
            parentName = parent.$options.name;
          } else {
            return null;
          }
        }
        return parent;
      }
      return null;
    },
    onRadioClick() {
      if (!this.isDisabled && !this.preventClick) {
        this.choose();
      }
    },
    select() {
      if (!this.isDisabled) {
        this.choose();
      }
    },
    choose() {
      if (this.currentValue !== this.label) {
        this.currentValue = this.label;
        this.$emit("input", this.currentValue);
        this.$emit("change", this.currentValue);
        if (this.isGroup) {
          let parent = this.getParent();
          parent.onRadioChange(this.label);
        }
      } else if (this.clearable) {
        this.currentValue = null;
        this.$emit("input", this.currentValue);
        this.$emit("change", this.currentValue);
        if (this.isGroup) {
          let parent = this.getParent();
          parent.onRadioChange(null);
        }
      }
    },
    setValue(groupValue) {
      this.currentValue = groupValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.evan-radio {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}

.evan-radio__label {
  font-size: 16px;
  margin-left: 8px;
  color: #333;
}

.evan-radio__inner {
  border-width: 1px;
  border-style: solid;
  background-color: #fff;
  /* #ifndef APP-NVUE */
  display: flex;
  box-sizing: border-box;
  /* #endif */
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.evan-radio__inner--round {
  border-radius: 50%;
}
</style>
