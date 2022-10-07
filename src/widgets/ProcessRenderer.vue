<template>
	<SvgPanZoom
		class="border"
		:class="{ loading: this.svg === null }"
		:zoomEnabled="true"
		:controlIconsEnabled="false"
		:fit="false"
		:center="true"
		@svgpanzoom="registerSvgPanZoom"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			style="height: 100%; width: 100%"
		>
			<g class="svg-pan-zoom_viewport" v-html="svg" style="transform: translate(100, 100)"></g>
		</svg>
	</SvgPanZoom>
</template>

<script>
import Viz from "viz.js";
import workerURL from "file-loader!viz.js/full.render.js";
import SvgPanZoom from "vue-svg-pan-zoom";
import axios from "axios";

export default {
	props: ["dotUrl"],
	data() {
		return {
			dot: null,
			svg: null,
			svgpanzoom: null,
		};
	},
	components: {
		SvgPanZoom,
	},
	watch: {
		dotUrl: "retrieveDot",
		dot: "updateModel",
	},
	mounted() {
		this.retrieveDot();
	},
	methods: {
		retrieveDot() {
			axios.get(this.dotUrl).then((res) => (this.dot = res.data));
		},
		updateModel() {
			this.svg = null;
			if (this.dot !== null) {
				var viz = new Viz({ workerURL });
				viz.renderSVGElement(this.dot)
					.then((element) => {
						this.svg = element.innerHTML;
					})
					.catch((error) => console.error(error));
			}
		},
		registerSvgPanZoom(svgpanzoom) {
			this.svgpanzoom = svgpanzoom;
		},
	},
};
</script>

<style scoped>
.loading {
	background: url("../assets/loader.svg") center center no-repeat !important;
}
</style>
