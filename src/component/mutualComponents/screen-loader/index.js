import React, { Component } from 'react';
import { LoadingOutlined, Loading3QuartersOutlined } from '@ant-design/icons';
import './styles.css';
// import './styles-flip-book.css';
// import svg1 from './3.svg';

class ScreenLoader extends Component {
	render() {
		const pr = this.props;
		const {
			active,
			color,
			bg,
			children } = pr;

		// const type = (pr.type && pr.type <= 4 && pr.type !== 0 ? pr.type : '1');
		const tip = pr.tip ? pr.tip : "Loading, Please wait...";
		const loaderType = pr.loaderType ? pr.loaderType : "circle";
		const childExists = pr.children ? "children_container" : "";
		const bgc = pr.bgc ? pr.bgc : "white";
		const inline = pr.inline ? "c_k_screenLoaderInline" : "";
		const style = pr.style ? pr.style : {};


		const colorStyle = (color ? { 'color': color } : {});
		const bgStyle = (bg ? { 'background': bg } : {});

		return (
			<span className={"c_k_screenLoader_0"} style={style}>
				{/* <LoadingOutlined /> */}
				{active ?
					<span className={childExists + " " + inline}>
						<div className={`c_k_container bgc_${bgc}`} style={bgStyle}>
							<div className={`content ${pr.className ? pr.className : ''}`}>
								{(loaderType === 'box') &&
									<div className="inline">
										<div className="spinner">{/*<img src={svg1} alt="" />*/}S</div>
										<div className="label" style={colorStyle}>{tip}</div>
									</div>
								}
								{loaderType === 'window' &&
									<div className="cube-wrapper">
										<div className="cube-folding">
											<span className="leaf1"></span>
											<span className="leaf2"></span>
											<span className="leaf3"></span>
											<span className="leaf4"></span>
										</div>
										<span className="loading" style={colorStyle}>{tip}</span>
									</div>
								}
								{loaderType === 'jellyBox' &&
									<div>
										<div id="loader">
											<div id="shadow"></div>
											<div id="box" style={pr.jellyBoxColor && { 'background': pr.jellyBoxColor }}></div>
										</div>
										<div className="label jellyBoxLabel" style={colorStyle}>{tip}</div>
									</div>
								}
								{/* {loaderType === 'flipbook' &&
									<div>
										<div className="book">
											<div className="book__page"></div>
											<div className="book__page"></div>
											<div className="book__page"></div>
										</div>
										<div className="label">{tip}</div>
									</div>
								} */}
								{loaderType === 'circle' &&
									<div>
										<div className="circle">
											{/* <Icon type="loading" /><br /> */}
											<LoadingOutlined className="ant-loading" /><br />
											{/* <Loading3QuartersOutlined /> */}
											<div className="label">{tip}</div>
										</div>
									</div>
								}
								{loaderType === 'website' &&
									<div>
										<div className="website">
											<Loading3QuartersOutlined className="ant-loading" spin /><br />
											<div className="label">{tip}</div>
										</div>
									</div>
								}
							</div>{/*End Content*/}
							<span className="children">{children}</span>
						</div>{/*End c_k_container*/}
					</span>
					: (children && children)
				}
			</span>
		);
	}
}

export default ScreenLoader;