import Head from "next/head";
import NavButton from "../components/NavButton";
import Container from "../components/Container";
import Button from "../components/Button";
import styles from "../../styles/Home.module.css";
import styled from "styled-components";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com/%22%3E" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com/"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <NavButton />
        <Container>
          <div className={styles.content}>
            <h1 className={styles.header}>AnatoMate</h1>
            <h2 className={styled.description}>
              &emsp;A web application for artist who want an improvement. We can
              help suggest what you should focus to improve your human anatomy
              drawing.
            </h2>
            <Button
              onClick={() => router.push("/analyse")}
              style={{ fontSize: "1.5em" }}
            >
              Try now
            </Button>
          </div>

          <img src="/coverImg.png" className={styles.model} />
        </Container>
      </main>
    </div>
  );
}
