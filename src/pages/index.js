import React from "react"

import 'bootstrap/dist/css/bootstrap.min.css';
import './../components/Cards/card-style.css';

import Layout from "../components/layout"
import SEO from "../components/seo"
import CardsBoard from './../components/Cards/CardsBoard';


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <CardsBoard />
  </Layout>
)

export default IndexPage
