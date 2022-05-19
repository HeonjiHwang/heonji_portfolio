<template>
    <div class="wrapper">
        <section class="page page1">

        </section>
        <section class="page page2">

        </section>
        <section class="page page3">

        </section>
    </div>
</template>

<script>
/* eslint-disable */
import {onBeforeMount} from 'vue';
import axios from 'axios'

export default{
    data(){
        return {
            inMove : false,
            activeSection : 0,
            offsets : [],
            touchStartY : 0
        }
    },
    mounted(){
        this.calculateSectionOffsets();

        window.addEventListener("DOMMouseScroll", this.handleMouseWheelDOM, {passive : false});
        window.addEventListener("mousewheel", this.handleMouseWheel, {passive : false});

        window.addEventListener("touchstart", this.touchStart, {passive : false});
        window.addEventListener("touchmove", this.touchMove, {passive : false});
    },
    unmounted(){
        window.removeEventListener("mousewheel", this.handleMouseWheel, {passive : false});
        window.removeEventListener("DOMMouseScroll", this.DOMMouseScroll);

        window.removeEventListener("touchstart", this.touchStart);
        window.removeEventListener("touchmove", this.touchMove);
    },
    setup(){
        onBeforeMount(()=>{
            axios({
                url : 'https://api.coingecko.com/api/v3/coins/markets',
                method : 'GET',
                params : {vs_currency: 'usd', ids:'ethereum'}        
            }).then(res => console.log(res))
        })
    },
    methods: {
        calculateSectionOffsets(){
            let sections = document.getElementsByTagName("section");

            for(let i=0;i<sections.length;i++){
                this.offsets.push(sections[i].offsetTop);
            }
        },
        handleMouseWheel(e){
            console.log(e.wheelDelta)
            if(e.wheelDelta < 30 && !this.inMove){
                this.moveUp();
            }else if(e.wheelDelta > 30 && !this.inMove){
                this.moveDown();
            }

            e.preventDefault();
            return false;
        },
        handleMouseWheelDOM(e){
            if(e.detail > 0 && !this.inMove){
                this.moveUp();
            }else if(e.detail < 0 && !this.inMove){
                this.moveDown();
            }
            return false;
        },
        moveDown(){
            this.inMove = true;
            this.activeSection--;

            console.log("down")
            if(this.activeSection < 0) this.activeSection = this.offsets.length - 1;

            this.scrollToSection(this.activeSection, true);
        },
        moveUp(){
            this.inMove = true;
            this.activeSection++;

            if(this.activeSection > this.offsets.length - 1) this.activeSection = 0;

            this.scrollToSection(this.activeSection, true);
        },
        scrollToSection(id, force = false){
            if(this.inMove && !force) return false;

            this.activeSection = id < 0 ? this.offsets.length - 1 : id;
            this.inMove = true;
            
            document.getElementsByTagName("section")[id].scrollIntoView({behavior : 'smooth'})

            setTimeout(()=>{
                this.inMove = false;
            }, 400)
        },
        touchStart(e){
            e.preventDefault();
            this.touchStartY = e.touches[0].clientY;
        },
        touchMove(e){
            if(this.inMove) return false;
            e.preventDefault();

            const currentY = e.touches[0].clientY;

            if(this.touchStartY < currentY){
                this.moveDown();
            }else{
                this.moveUp();
            }

            this.touchStartY = 0;
            return false;
        }
    }
}
</script>