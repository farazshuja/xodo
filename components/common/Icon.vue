<template>
    <svg class="svg-icon" viewBox="0 0 24 24" :class="'svg-icon--' + type">
      <path :d="path" />
    </svg>  
</template>

<script>
// optimized icon paths
const paths = {
  edit: "M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",
  delete: "M15,16H19V18H15V16M15,8H22V10H15V8M15,12H21V14H15V12M3,18A2,2 0 0,0 5,20H11A2,2 0 0,0 13,18V8H3V18M14,5H11L10,4H6L5,5H2V7H14V5Z"
}

export default {
  props: ['type'],
  computed: {
    path () {
      return paths[this.type]
    }
  }
}
</script>

<style>
  .svg-icon {
    width: 24px;
    height: 24px;
    fill: #b7a84d; 
    cursor: pointer;
    margin: auto 3px;
  }
  .svg-icon:hover {
    opacity: .8;
  }

  @media screen and (max-width: 768px) {
    .svg-icon {
      width: 20px;
      height: 20px;
    }
    
  }

</style>


