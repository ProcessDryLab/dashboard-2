import Vue from "vue";
import VueRouter from "vue-router";
import ContentVisualizer from "../components/ContentVisualizer.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/resource/:id",
		name: "ContentVisualizer",
		component: ContentVisualizer,
	},
];

const router = new VueRouter({
	routes,
});

export default router;
