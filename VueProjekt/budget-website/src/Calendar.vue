<template>
  <article id="calendar" style="font-size: 0.8rem; height:200px; margin-top: 10px;"
    :style="{}">
    <header>
      <div class="aktuelles-datum">
          {{ weekdayNames[currentDay] }}
        </div>
        <div class="heute">
          <div><div class="pfeil-hoch" @click="monthUp()"></div></div>
         <!-- <div><div class="pfeil-hoch" @click="currentDate.year += 1"></div></div>-->
          <div>{{ month[currentDate.month] }}</div>
          <div>{{ currentDate.year }}</div>
         <div><div class="pfeil-runter" @click="monthDown()"></div></div>
        <!-- <div><div class="pfeil-runter" @click="currentDate.year -= 1"></div></div>-->
        </div>
    </header>
    <section>
      <div class="wochentage">
       <div class="weekday" v-for="(weekday, index) in wochentage" :key="index">
          {{ weekday }}
        </div>
      </div>
      <div class="date">
        <div class="day-hidden" v-for="(n, index) in (firstMonthDay -1)" :key="'prev'+index">
          {{ (prevMonthDays +1) - firstMonthDay + n }}
        </div>
        <div class="day" 
            :class="{ active: n === currentDate.date}"
            @click="currentDate.date = n"
            v-for="(n, index) in currentMonthDays" 
            :key="'day'+index">
          {{ n }}
        </div>
        <div class="day-hidden" v-for="(n, index) in (43 - (currentMonthDays + firstMonthDay))" :key="'next'+index">
          {{ n }}
        </div>
      </div>
    </section>
  </article>
</template>

<script>
  export default {
    data: function() {
      return {
        wochentage: ['Mo','Di','Mi','Do','Fr','Sa','So'],
        weekdayNames: [],
        month: [
          'Januar','Februar','März','April','Mai','Juni','Juli',
          'August','September','Oktober','November','Dezember'
        ],
        currentDate: {
          date: 0,
          month: 0,
          year: 0
        }
      }
    },
    computed: {
      prevMonthDays() {
        let year = this.currentDate.month === 0 ? this.currentDate.year - 1 : this.currentDate.year;
        let month = this.currentDate.month === 0 ? 12 : this.currentDate.month;
        return new Date(year, month, 0).getDate();
      },
      firstMonthDay() {
        let firstDay = new Date(this.currentDate.year, this.currentDate.month, 1).getDay();
        if(firstDay === 0) firstDay = 7;
        return firstDay;
      },
      currentDay() {
        return new Date(this.currentDate.year, this.currentDate.month, this.currentDate.date).getDay();
      },
      currentMonthDays() {
        return new Date(this.currentDate.year, this.currentDate.month +1, 0).getDate();
      }
    },
    methods: {
      getCurrentDate() {
        let heute = new Date();
        this.currentDate.date = heute.getDate();
        this.currentDate.month = heute.getMonth();
        this.currentDate.year = heute.getFullYear();
      },
      dateUp() {
        if(this.currentDate.date === this.currentMonthDays) {
          this.currentDate.date = 1;
          this.monthUp();
        }
        else {
          this.currentDate.date += 1;
        }
      },
      dateDown() {
        if(this.currentDate.date === 1) {
          this.currentDate.date = this.prevMonthDays;
          this.monthDown();
        }
        else {
          this.currentDate.date -= 1;
        }
      },
      monthUp() {
        if(this.currentDate.month === 11) {
          this.currentDate.month = 0;
          this.currentDate.year += 1;
        }
        else {
          this.currentDate.month += 1;
        }        
      },
      monthDown() {
        if(this.currentDate.month === 0) {
          this.currentDate.month = 11;
          this.currentDate.year -= 1;
        }
        else {
          this.currentDate.month -= 1;
        } 
      }
    },
    created() {
      this.getCurrentDate();
    }
  }
</script>

<style lang="scss" scoped>

  @mixin calendar-layout($property) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    grid-gap: 5px;
    padding: 3px;

    div {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 22px;
      color: #2E3754;
      border-radius: 5px;
    }
  }

  @mixin arrow-style() {
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    cursor: pointer;
  }

  #calendar {
    width: 100%;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    background-size: 100px;
    user-select: none;

    header {
      display: flex;
      justify-content: center;
      align-items: top;
      height: 30px;
      padding: 5px 0 0;
      text-align: center;
      overflow: hidden;
      color: #2E3754;
    
      .pfeil-hoch {
        @include arrow-style();
        border-bottom: 5px solid #2E3754;
        border-left:1 0px solid #2E3754; 
        }

      .pfeil-runter {
        @include arrow-style();
        border-top: 5px solid #2E3754;
      }

      .heute {
        display: grid;
        grid-template-rows: 8px 1fr 10px;
        grid-template-columns: 10px 80px 50px;
        grid-gap:5px;

        div {
          display: flex;
          justify-content: center;
        }
      }

       .heute {
      font-size: 1rem;
      }
    }

    .wochentage {
      @include calendar-layout(10px 15px 10px);
      background-color: rgb(221, 217, 217);
      border-bottom: 1px solid #fff;

      div:nth-child(7n) {
        color: rgb(236, 112, 10);
      }
    }

    .date {
      @include calendar-layout(10px 15px 20px);
      background-color: #fff;

      .active {
        background-color: #13B4B6;
        color: white;
      }

      .day {
        cursor: pointer;

        &:hover {
          background-color: rgb(221, 217, 217);
          color: #2A4C50;
        }

        &:nth-child(7n) {
          color: rgb(236, 112, 10);

          &:hover {
            background-color: rgb(221, 217, 217);
            color: rgb(236, 112, 10);
          }
        }
      }

      .day-hidden {
        opacity: .4;

        &:nth-child(7n) {
          color: rgb(236, 112, 10);
        }
      }
    }
  }
</style>
