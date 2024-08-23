<script setup>
import {ref} from "vue";
import {data} from "autoprefixer";

const props = defineProps({
  question: Object,
  index: Number
});
const  emit = defineEmits(['deleteQuestion', 'change', 'addQuestion']);
const  model = ref(JSON.parse(JSON.stringify(props.question)));
</script>

<template>
  <div class="flex items-center justify-between">
    <h3 class="text-lg font-bold"></h3>
      {{index + 1}}.{{model.question}}
    <div class="flex items-center">
<!--      Add  new  question-->
      <button type="button" @click="addQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-800"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>Add Question</button>
<!--      Delete question-->
      <button type="button" @click="deleteQuestion()" class="flex items-center text-xs py-1 px-3 mr-2 rounded-sm text-white bg-gray-600 hover:bg-gray-800"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
      </svg>Delete</button>
    </div>
  </div>
<!--  Question Index-->
  <div class="grid gap-3 grid-cols-12">
<!--    Question-->
    <div class="mt-3 col-span-9">
      <label :for="'question_text_'+model.data" class="block text-sm font-medium text-gray-700">Question Text</label>
      <input type="text" :name="'question_text_'+model.data" v-model="model.question" @change="dataChange" :id="'question_text_'+model.data" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
    </div>
<!--    Question Type-->
    <div class="mt-3 col-span-3">
      <label for="question_type" class="block text-sm font-medium text-gray-500">
        Select Question Type
      </label>
      <select id="question_type" name="question_type" v-model="model.type" @change="typeChange" class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
        <option v-for="type in questionTypes" :key="type" :value="type">
          {{ type }}
        </option>

      </select>
    </div>
  </div>
<!--  Question Description-->
  <div class="mt-3 col-span-9">
    <label :for="'question_description_'+model.id" class="block text-sm font-medium text-gray-700">Question Description</label>
    <textarea :id="'question_description_'+model.id" :name="'question_description_'+model.id" v-model="model.description" @change="dataChange" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
  </div>

<!--  Question Options-->
 <div>
   <div v-if="shouldHaveQuestion()" class="mt-2">
     <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">Options
     <button type="button" @click="addOption()" class="flex items-center text-xs py-1 px-2 rounded-sm text-white bg-gray-800 hover:bg-gray-700">Add Option</button>
     </h4>

   </div>
    <div v-if="!model.data.option.length" class="text-xs text-gray-600 py-3">You don't have any options defined</div>
 </div>
</template>

<style scoped>

</style>
