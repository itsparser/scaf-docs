// this will decode the url endcode content like

// import { TemplateApi } from "@/lib/api/template";
// import { useEffect } from "react";

// %40itsparser  to @itsparser
function decodeURL(url: string) {
	return decodeURIComponent(url);
}

export default function Page({
	params,
}: {
	params: { templateId: string; username: string };
}) {
	let userID = decodeURL(params.username);
	if (userID.startsWith("@")) {
		userID = userID.substring(1);
	}
	// const [template, setTemplate] = useState<Template>();
	// useEffect(() => {
	// 	TemplateApi.getTemplate(params.templateId).then((response) => {
	// 		if (response.data) {
	// 			setTemplate(response.data);
	// 		}
	// 	});
	// }, []);

	//https://localhost:3000/api/userID/templateId

	return (
		<div className="m-20 mt-24">
			<h1>
				My Page ---{userID}---- {params.templateId}
			</h1>
			<div className="flex flex-col gap-4">
				<span>Name:</span>
				<span>Tags: </span>
				<span>Language: </span>
				<span>Created By: </span>
				<span>Created At: </span>
				<span>Updated At: </span>
				<span>Status: </span>
				<span>Extends: </span>
				<span>Steps: </span>
				<span>Args: </span>
				<span>Template ID: </span>
				<span>Version: </span>
				<span>ID: </span>
				<span>Description: </span>
			</div>
		</div>
	);
}
