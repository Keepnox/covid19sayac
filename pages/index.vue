<template lang="pug">
  .flex.flex-wrap.-px-3(v-if="filteredData")
    .info-text.flex(class="flex w-full lg:px-4 lg:mt-5 lg:-mb-2 pt-10 lg:pt-0 px-4 mt-2")
        p.text-gray-600(v-if="updatedTime") Son güncelleme: <span> <strong class="text-gray-700"> {{updatedTime | formatDate}} </strong> </span>
    world-wide-data(v-if="data" :wwData="data[data.length - 1]")
    card-item(v-if="item.country === 'Turkey'" v-for="item in data" :item="item" class="lg:hidden sm:hidden").just-turkey
    .search(class="w-full px-4 mt-2 md:justify-end")
      .flex.flex-wrap
        .navigator-outer(class="w-full md:w-9/12")
          button.inline-flex.items-center.border.bg-white.text-gray-700.font-bold.py-2.px-4.rounded-l.keepnox-list-type-button(class='hover:bg-gray-400 w-6/12 md:w-2/12 xl:w-2/12 lg:w-2/12 lg:mr-2' @click="viewData = 'list'" :class="{active: viewData === 'list'}")
            svg#List(class="fill-current w-4 h-4 mr-2" xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', version='1.1', x='0px', y='0px', viewBox='0 0 20 20', enable-background='new 0 0 20 20', xml:space='preserve')
              path(fill='#4a5568', d='M14.4,9H8.6C8.048,9,8,9.447,8,10s0.048,1,0.6,1h5.8c0.552,0,0.6-0.447,0.6-1S14.952,9,14.4,9z M16.4,14H8.6  C8.048,14,8,14.447,8,15s0.048,1,0.6,1h7.8c0.552,0,0.6-0.447,0.6-1S16.952,14,16.4,14z M8.6,6h7.8C16.952,6,17,5.553,17,5  s-0.048-1-0.6-1H8.6C8.048,4,8,4.447,8,5S8.048,6,8.6,6z M5.4,9H3.6C3.048,9,3,9.447,3,10s0.048,1,0.6,1h1.8C5.952,11,6,10.553,6,10  S5.952,9,5.4,9z M5.4,14H3.6C3.048,14,3,14.447,3,15s0.048,1,0.6,1h1.8C5.952,16,6,15.553,6,15S5.952,14,5.4,14z M5.4,4H3.6  C3.048,4,3,4.447,3,5s0.048,1,0.6,1h1.8C5.952,6,6,5.553,6,5S5.952,4,5.4,4z')
            span Liste
          button.inline-flex.items-center.border.bg-white.text-gray-700.font-bold.py-2.px-4.rounded-l.keepnox-list-type-button(class='hover:bg-gray-400 w-6/12 md:w-2/12 xl:w-2/12 lg:w-2/12' @click="viewData = 'table'" :class="{active: viewData === 'table'}")
            svg#Text_document(class="fill-current w-4 h-4 mr-2" xmlns='http://www.w3.org/2000/svg', xmlns:xlink='http://www.w3.org/1999/xlink', version='1.1', x='0px', y='0px', viewBox='0 0 20 20', enable-background='new 0 0 20 20', xml:space='preserve')
              path(fill='#4a5568', d='M16,1H4C3.447,1,3,1.447,3,2v16c0,0.552,0.447,1,1,1h12c0.553,0,1-0.448,1-1V2C17,1.448,16.553,1,16,1z   M15,17H5V3h10V17z M13,5H7v2h6V5z M13,13H7v2h6V13z M13,9H7v2h6V9z')
            span Tablo
        .flex.keep-select-outer(class="w-full my-2 md:mt-0 md:w-1/12 md:justify-end ")
          .inline-block.relative.w-full
            select.keepnox-select.appearance-none.bg-gray-200.text-gray-700.w-full.border-gray-200.rounded.w-full.py-2.px-4.text-gray-700(class='hover:border-gray-500 focus:outline-none ' @change="filterSelectBox($event)")
              option( v-for="ff in filterProps" :value="ff.props") {{ff.title}}
            .pointer-events-none.absolute.inset-y-0.right-0.flex.items-center.px-2.bg-gray-200
              svg.fill-current.h-4.w-4(xmlns='http://www.w3.org/2000/svg', viewBox='0 0 20 20')
                path(d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z')
        .search-box(class="w-full md:w-2/12 align-end")
          input#inline-full-name.bg-gray-200.appearance-none.border-2.border.bg-white.rounded.w-full.py-2.px-4.text-gray-700.leading-tight(class='outline-none focus:bg-gray-200' type='text' v-model="search" placeholder='Ülke Ara')
    card-item(v-if="viewData==='list' && item.country !== 'Total:'" v-for="item in filteredData" :item="item")
    table-item(v-if="viewData==='table'" :item="filteredData")
</template>

<script>

import Fuse from "fuse.js";
import _ from "lodash";
import axios from "axios";
import { format } from 'date-fns'

import Logo from '~/components/Logo.vue'
import cardItem from '~/components/CardItem.vue'
import tableItem from '~/components/TableItem.vue'
import worldWideData from '@/components/WorldWideData.vue'

const SortingField = {
  TotalCase: "TotalCase",
  ActiveCase: "ActiveCase",
  DeathCount: "DeathCount",
  DeathRate: "DeathRate",
  Name: "Name"
};

const fetchData = async context => {
  const res = await context.$axios.get("/api/covid19");
  return res.data.data;
};


function getOrderByArguments(sortingField) {
  switch (sortingField) {
    case SortingField.TotalCase:
      return [["confirmed"], ["desc"]];
    case SortingField.ActiveCase:
      return [
        ["activeCase", "confirmedRate"],
        ["desc", "desc"]
      ];
    case SortingField.DeathCount:
      return [["death"], ["desc"]];
    case SortingField.DeathRate:
      return [item => item.deathRate * 0.6 + item.death * 0.6, ["desc"]];
    case SortingField.Name:
      return [["country"], ["asc"]];
    default:
      return [["confirmed"], ["desc"]];
  }
}


export default {
  head: {
    title: "Veriler",
    meta: [
      {
        hid: "description",
        name: "description",
        content:
          "Covid 19, Corona virüsü hakkında ayrıntılı veriler ve bilgilere ulaşabilirsiniz."
      }
    ]
  },
  components: {
    Logo,
    cardItem,
    tableItem,
    worldWideData
  },
  data: () => ({
    sortingField: SortingField.TotalCase,
    viewData: "list",
    data: [],
    search: "",
    updateSearchQuery: "",
    updatedTime: null,
    filterProps: [
        {
          title: "Toplam Vaka",
          props: "TotalCase"
        },
        {
          title: "Aktif Vaka",
          props: "ActiveCase"
        },
        {
          title: "Ölüm Sayısı",
          props: "DeathCount"
        },
        {
          title: "Ölüm Oranı",
          props: "DeathRate"
        },
        {
          title: "A -> Z",
          props: "Name"
        }
      ]
  }),
  filters: {
    formatDate: function (value) {
      return format(value, 'dd.MM.yyyy - HH:mm:ss')
    }
  },
  computed: {
    filteredData() {
      if (!this.data) {
        return [];
      }

      let data = this.data;

      const fuse = this.getFuse();

      if (this.search) {
        data = fuse.search(this.search);
        data = _.map(data, function (dd) {return dd.item})
      }

      return _.chain(data)
        .orderBy(...getOrderByArguments(this.sortingField))
        .value();
    }
  },
  asyncData: async context => {
    const data = await fetchData(context);
    return { data: data.data, updatedTime: new Date(data.updatedTime) , loading: false };
  },
  methods: {
    getFuse() {
      if (!this.fuse) {
        this.fuse = new Fuse(this.data, {
          shouldSort: true,
          threshold: 0.5,
          location: 0,
          distance: 100,
          minMatchCharLength: 3,
          keys: ["country"]
        });
      }

      return this.fuse;
    },
    setSortingField(field) {
      this.sortingField = field;
    },
    filterSelectBox(props) {
      this.setSortingField(props.target.value);
    },

  },
  watch: {

  },
  mounted() {

  }
}
</script>

<style lang="sass" >
  .search
    border-top: 1px solid #e2e8f0
    padding-top: 15px
  button:focus
    outline: 0 !important
  .just-turkey
    border-top: 1px solid #e2e8f0;
  .keepnox-list-type-button.active
    background-color: #cbd5e0
  .keep-select-outer
    @media(min-width: 992px)
      transform: translatex(-10px) !important;
  
</style>