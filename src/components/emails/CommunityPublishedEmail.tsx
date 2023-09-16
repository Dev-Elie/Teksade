import { Body, Button, Container, Head, Heading, Hr, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";
import * as React from "react";

interface CommunityPublishedEmaillProps {
  communityName: string;
  communityId: string;
}

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "";

export const CommunityPublishedEmail = ({ communityName = "Tech community", communityId }: CommunityPublishedEmaillProps) => {
  const previewText = `🎉 Community ${communityName} published on Teksade`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-[40px] w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">🌍 **Greetings from Teksade!** 🌍</Heading>

            <Text className="text-[14px] leading-[24px] text-black">
              🚀 Sensational News! Your community
              <Link href={`https://www.teksade.com/communities/${communityId}`} className="text-blue-600 no-underline">
                {communityName}
              </Link>
              has officially taken off and is now live on <strong>Teksade</strong>! 🌟
            </Text>

            <Text className="text-[14px] leading-[24px] text-black">
              Dive in and experience the synergy. Share your community, engage with members, and embark on a journey of camaraderie. And remember, we thrive on feedback. Our team is just an email
              away. 🤝
            </Text>

            <Section className="mb-[32px] mt-[32px] text-center">
              <Button pX={20} pY={12} className="rounded-full bg-[#5c7cfa] text-center text-[12px] font-semibold text-white no-underline" href={`https://www.teksade.com/communities/${communityId}`}>
                Check it out
              </Button>
            </Section>

            <Text className="text-[14px] leading-[24px] text-black">Stay awesome and let&apos;s make magic together on Teksade! ✨</Text>

            <Text className="text-[14px] leading-[24px] text-black">
              Cheers,
              <br />
              The Teksade Team
            </Text>

            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />

            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This email comes to you from the Teksade team in recognition of a community recently added to <Link href="https://www.teksade.com">Teksade</Link>. If this doesn&apos;t resonate with you,
              kindly disregard this message. For concerns about your account&apos;s safety, respond directly, and we&apos;ll be here to assist you.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default CommunityPublishedEmail;
