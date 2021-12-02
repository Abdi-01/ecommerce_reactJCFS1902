import React from 'react';
import { Carousel, CarouselCaption, CarouselControl, CarouselIndicators, CarouselItem } from 'reactstrap';
import { connect } from 'react-redux';
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bannerList: [{
                altText: 'Slide 1',
                caption: 'Slide 1',
                key: 1,
                src: 'https://pbs.twimg.com/media/EjS6MihVgAEZhPP.jpg'
            },
            {
                altText: 'Slide 2',
                caption: 'Slide 2',
                key: 2,
                src: 'https://ecs7.tokopedia.net/img/attachment/2019/11/29/27760349/27760349_bd38c2c1-8b73-4060-b9f2-d950342b05a9.jpg?width=1200&height=600'
            },
            {
                altText: 'Slide 3',
                caption: 'Slide 3',
                key: 3,
                src: 'https://pbs.twimg.com/media/EFh6FOiUYAAp_ER.jpg'
            }],
            selectedIdx: 1
        }
    }
    render() {
        let { bannerList, selectedIdx } = this.state
        let { productsList } = this.props
        return (
            <div>
                <Carousel
                    className="pt-4 rounded shadow bg-white"
                    activeIndex={selectedIdx}
                    next={() => this.setState({ selectedIdx: selectedIdx == bannerList.length - 1 ? selectedIdx - (bannerList.length - 1) : selectedIdx + 1 })}
                    previous={() => this.setState({ selectedIdx: selectedIdx == 0 ? bannerList.length - 1 : selectedIdx - 1 })}
                >
                    {/* <CarouselIndicators
                        activeIndex={selectedIdx}
                        items={bannerList}
                    /> */}
                    {
                        bannerList.map((value, index) => {
                            return <CarouselItem>
                                <img
                                    style={{ borderRadius: "10px", height: "85vh", objectFit: "cover" }}
                                    alt={`img${index}`}
                                    src={value.src}
                                    width="100%"

                                />
                                {/* <CarouselCaption
                                    captionHeader={value.caption}
                                    captionText={value.caption}
                                /> */}
                            </CarouselItem>
                        })
                    }
                    <CarouselControl
                        direction="prev"
                        directionText="Sebelum"
                        onClickHandler={() => this.setState({ selectedIdx: selectedIdx == 0 ? bannerList.length - 1 : selectedIdx - 1 })}
                    />
                    <CarouselControl
                        direction="next"
                        directionText="Sesudah"
                        onClickHandler={() => this.setState({ selectedIdx: selectedIdx == bannerList.length - 1 ? selectedIdx - (bannerList.length - 1) : selectedIdx + 1 })}
                    />
                </Carousel>
                {
                    productsList.length > 0 &&
                    <div className="container p-5">
                        <div className="row">
                            <div className="col-12 order-md-2 col-md-7" style={{ padding: "auto 10%" }}>
                                <h2 style={{ fontSize: "50px", marginTop: "25%" }}>{productsList[11].nama}
                                    <br />
                                    <span className="text-muted">{productsList[11].brand} | {productsList[11].kategori}</span></h2>
                                <p>{productsList[11].deskripsi}</p>
                            </div>
                            <div className="col-12 order-md-1 col-md-5">
                                <img className="shadow bg-white" src={productsList[11].images[0]}
                                    width="100%" alt="imgCtn" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-7" style={{ padding: "auto 10%" }}>
                                <h2 style={{ fontSize: "50px", marginTop: "25%" }}>{productsList[0].nama}
                                    <br />
                                    <span className="text-muted">{productsList[0].brand} | {productsList[0].kategori}</span></h2>
                                <p>{productsList[0].deskripsi}</p>
                            </div>
                            <div className="col-md-5">
                                <img className="shadow bg-white" src={productsList[0].images[0]}
                                    width="100%" alt="imgCtn" />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 order-md-2 col-md-7" style={{ padding: "auto 10%" }}>
                                <h2 style={{ fontSize: "50px", marginTop: "25%" }}>{productsList[12].nama}
                                    <br />
                                    <span className="text-muted">{productsList[12].brand} | {productsList[12].kategori}</span></h2>
                                <p>{productsList[12].deskripsi}</p>
                            </div>
                            <div className="col-12 order-md-1 col-md-5">
                                <img className="shadow bg-white" src={productsList[12].images[0]}
                                    width="100%" alt="imgCtn" />
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapToProps = ({ productsReducer }) => {
    // console.table(productsReducer.productsList)
    return {
        productsList: productsReducer.productsList
    }
}


export default connect(mapToProps)(HomePage);