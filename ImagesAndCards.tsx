'use client'
import React, { useEffect, useRef } from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import savingsImage from '../../../public/hyku-customer-savings.svg'
import savingsImage2 from '../../../public/hyku-customer-savings-2.svg'
import personImage from '../../../public/hyku-depressed-man.svg'
import personImageFull from '../../../public/hyku-depressed-man-full.svg'
import banksFaceImage1 from '../../../public/hyku-banks-face-image-1.svg'
import banksFaceImage2 from '../../../public/hyku-banks-face-image-2.svg'
import { useInView } from 'react-intersection-observer'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useTheme, useMediaQuery } from '@mui/material'

const ImagesAndCards = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const banksSectionRef = useRef<HTMLDivElement | null>(null)

  const theme = useTheme()
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  /* ================= CUSTOMERS ================= */
  gsap.registerPlugin(ScrollTrigger)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      gsap.set('.customers-heading, .customer-boxes-1 > *, .customer-boxes-2 > *', { opacity: 0 })

      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power3.out' },
      })

      tl.fromTo(containerRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        // heading first
        .fromTo('.customers-heading', { y: -120 }, { opacity: 1, y: 0 }, '+=0.1')
        // short delay → column 1
        .fromTo(
          '.customer-boxes-1 > *',
          { y: 80, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18 },
          '+=0.25'
        )
        // column 2
        .fromTo(
          '.customer-boxes-2 > *',
          { y: 80, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18 },
          '+=0.1'
        )
    }, containerRef)

    return () => ctx.revert()
  }, [inView])

  /* ================= BANKS (IN + OUT) ================= */
  useEffect(() => {
    if (!banksSectionRef.current) return

    const ctx = gsap.context(() => {
      // hide banks content completely by default
      gsap.set(
        '.banks-heading, .banks-boxes-1 > *, .banks-section img, .banks-section > div:not(.banks-boxes-1)',
        { opacity: 0 }
      )

      const tl = gsap.timeline({
        defaults: { duration: 0.9, ease: 'power3.out' },
      })

      tl.fromTo(banksSectionRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
        // heading first
        .fromTo('.banks-heading', { y: -120 }, { opacity: 1, y: 0 }, '+=0.1')
        // short delay → column 1
        .fromTo(
          '.banks-boxes-1 > *',
          { y: 80, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18 },
          '+=0.25'
        )
        // column 2
        .fromTo(
          '.banks-section img, .banks-section > div:not(.banks-boxes-1)',
          { y: 80, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, stagger: 0.18 },
          '+=0.1'
        )
    }, banksSectionRef)

    return () => ctx.revert()
  }, [inView])

  return (
    <Box
      ref={(node: HTMLDivElement) => {
        containerRef.current = node
        inViewRef(node)
      }}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 4, md: 6 },
        backgroundColor: '#fff',
        px: { xs: 2, sm: 4, md: 10 },
        my: 2,
        opacity: 0, // ✅ ensures white screen initially
      }}
    >
      {/* First Half */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', lg: 'center' },
          width: '100%',
          minHeight: { xs: 'auto', lg: '720px' },
          gap: { xs: 4, lg: 0 },
          mx: { xs: 'auto', md: 0 },
        }}
      >
        <Typography
          className="customers-heading"
          sx={{
            width: { xs: '80%', sm: '80%', md: '35%' },
            fontSize: { xs: '40px', sm: '48px', md: '56px' },
            lineHeight: { xs: '40px', sm: '48px', md: '56px' },
            color: '#444444',
            fontFamily: 'var(--font-darker-grotesque), sans-serif',
            fontWeight: 600,
          }}
        >
          Customers are left with
        </Typography>

        {/* Right Side of Cards & images */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            width: { xs: '100%', md: '55%' },
            gap: { xs: 4, md: 4 },
          }}
        >
          {!isDesktop && (
            <>
              {/* First right side box */}
              <Box
                sx={{
                  padding: '8px 12px',
                  backgroundColor: '#DE4E2A',
                  borderRadius: '16px',
                  width: '50%',
                  height: '95px',
                  gap: '24px',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    width: '90%',
                    height: '64px',
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    color: '#F5F5F5',
                    padding: '4px 0',
                  }}
                >
                  A lack of clarity, control, and confidence
                </Typography>
              </Box>

              {/* Second two image side by side */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  mt: 2,
                }}
              >
                <Image src={personImageFull} alt="image" width={150} height={220} />

                <Image
                  src={savingsImage2}
                  alt="image"
                  width={200}
                  height={220}
                  style={{ borderRadius: '24px' }}
                />
              </Box>

              {/* Third one box and one image side by side */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '100%',
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    padding: '16px 12px',
                    backgroundColor: '#8CBFB5',
                    borderRadius: '16px',
                    width: '200px',
                    height: '97px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '175px',
                      height: '74px',
                      fontFamily: 'var(--font-manrope), sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#444444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    No way to simulate the impact of major financial decisions
                  </Typography>
                </Box>

                <Image
                  src={savingsImage}
                  alt="image"
                  width={145}
                  height={94}
                  style={{ borderRadius: '24px', marginLeft: '5px' }}
                />
              </Box>

              {/* Fourth one box having full width */}
              <Box
                sx={{
                  padding: '8px 12px',
                  backgroundColor: '#52626E',
                  borderRadius: '16px',
                  width: '98%',
                  height: '75px',
                  mt: 2,
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    width: '100%',
                    height: '47px',
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    color: '#F5F5F5',
                  }}
                >
                  Confusion over trade-offs between short- and long-term goals
                </Typography>
              </Box>
            </>
          )}

          {/* First --> 2 cards & 1 Image */}
          {isDesktop && (
            <>
              <Box
                className="customer-boxes-1"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <Box
                  sx={{
                    padding: '16px 24px',
                    backgroundColor: '#DE4E2A',
                    borderRadius: '24px',
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '360px',
                      lg: '350px',
                    },
                    height: '116px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '95%',
                      height: '84px',
                      fontFamily: 'var(--font-manrope), sans-serif;',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    A lack of clarity, control, and transparency
                  </Typography>
                </Box>

                <Image
                  src={savingsImage}
                  alt="image"
                  width={300}
                  height={300}
                  style={{ width: '95%', height: 'auto', margin: '10px 0' }}
                />

                <Box
                  sx={{
                    padding: '16px 24px',
                    backgroundColor: '#52626E',
                    borderRadius: '24px',
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '380px',
                      lg: '367px',
                    },
                    height: '126px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '95%',
                      height: '84px',
                      fontFamily: 'var(--font-manrope), sans-serif;',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Confusion over trade-offs between short- and long-term goals
                  </Typography>
                </Box>
              </Box>

              {/* Second side of customer boxes */}
              <Box
                className="customer-boxes-2"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  textAlign: 'left',
                  horizontalAlign: 'right',
                }}
              >
                <Image
                  src={savingsImage2}
                  alt="image"
                  width={300}
                  height={300}
                  style={{ width: '95%', height: 'auto', margin: '10px 0' }}
                />

                <Box
                  sx={{
                    padding: '16px 24px',
                    backgroundColor: '#8CBFB5',
                    borderRadius: '24px',
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '380px',
                      lg: '367px',
                    },
                    height: '126px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '95%',
                      height: '84px',
                      fontFamily: 'var(--font-manrope), sans-serif;',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#444444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    No way to simulate the impact of major financial decisions
                  </Typography>
                </Box>

                <Image
                  src={personImage}
                  alt="image"
                  width={300}
                  height={300}
                  style={{ width: '95%', height: 'auto', margin: '10px 0' }}
                />
              </Box>
            </>
          )}
        </Box>
      </Box>

      {/* Second Half */}
      <Box
        ref={banksSectionRef}
        className="banks-section"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', lg: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', lg: 'center' },
          width: '100%',
          minHeight: { xs: 'auto', lg: '720px' },
          gap: { xs: 4, lg: 0 },
          mx: { xs: 'auto', md: 0 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-around',
            alignItems: 'center',
            width: { xs: '100%', lg: '53%' },
            gap: { xs: 4, md: 6 },
          }}
        >
          {!isDesktop && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}
            >
              {/* /First banks heading */}
              <Typography
                className="banks-heading"
                sx={{
                  fontSize: { xs: '40px', sm: '48px' },
                  lineHeight: '40px',
                  color: '#444444',
                  fontFamily: 'var(--font-darker-grotesque), sans-serif',
                  fontWeight: 600,
                  mb: 4
                }}
              >
                Banks Face
              </Typography>

              {/* second the right side box: */}

              <Box
                sx={{
                  padding: '8px 12px',
                  backgroundColor: '#8CBFB5',
                  borderRadius: '16px',
                  width: '173px',
                  height: '68px',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontFamily: 'var(--font-manrope), sans-serif',
                    fontWeight: 600,
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                    color: '#444444',
                    textAlign: 'left'
                  }}
                >
                  Low Digital Engagement
                </Typography>
              </Box>

              {/* 1 image on left  and one text div and image on right side by side */}
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  gap: 2
                }}
              >
                <Image
                  src={banksFaceImage1}
                  alt="image"
                  width={145}
                  height={220}
                  style={{height: '270px', marginTop: '100px', borderRadius: '24px' }}
                />

                {/* image and text div in column */}
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src={banksFaceImage2}
                    alt="image"
                    width={200}
                    height={200}
                    style={{ margin: '10px 0' }}
                  />

                  <Box
                    sx={{
                      padding: '8px 12px',
                      backgroundColor: '#DE4E2A',
                      borderRadius: '16px',
                      width: '200px',
                      height: '70px',
                    }}
                  >
                    <Typography
                      variant="h4"
                      sx={{
                        fontFamily: 'var(--font-manrope), sans-serif;',
                        fontWeight: 600,
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                        color: '#F5F5F5',
                        textAlign: 'left'
                      }}
                    >
                      No Visibility into Real User Intent or Needs
                    </Typography>
                  </Box>
                </Box>
              </Box>


                {/* 3rd complete text div having full width: */}

                <Box
                  sx={{
                    padding: '8px 12px',
                    backgroundColor: '#52626E',
                    borderRadius: '16px',
                    width: '100%',
                    height: '68px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    mt: 4
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      fontFamily: 'var(--font-manrope), sans-serif',
                      fontWeight: 600,
                      fontSize: '16px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#F5F5F5',
                      textAlign: 'left'
                    }}
                  >
                    Missed Product Conversion Opportunities
                  </Typography>
                </Box>
            </Box>
          )}

          {isDesktop && (
            <>
              {/* First --> 2 cards & 1 Image */}
              <Box
                className="banks-boxes-1"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                }}
              >
                <Box
                  sx={{
                    padding: '16px 24px',
                    backgroundColor: '#8CBFB5',
                    borderRadius: '24px',
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '360px',
                      lg: '350px',
                    },
                    height: '112px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '95%',
                      height: '75px',
                      fontFamily: 'var(--font-manrope), sans-serif;',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#444444',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Low Digital Engagement
                  </Typography>
                </Box>

                <Image
                  src={banksFaceImage1}
                  alt="image"
                  width={300}
                  height={300}
                  style={{ width: '95%', height: 'auto', margin: '10px 20px' }}
                />

                <Box
                  sx={{
                    padding: '16px 24px',
                    backgroundColor: '#DE4E2A',
                    borderRadius: '24px',
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '320px',
                      lg: '305px',
                    },
                    height: '111px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '95%',
                      height: '84px',
                      fontFamily: 'var(--font-manrope), sans-serif;',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    No Visibility into Real User Intent or Needs
                  </Typography>
                </Box>
              </Box>

              {/* Second --> 1 Image & 1 Card */}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  textAlign: 'left',
                }}
              >
                <Image
                  src={banksFaceImage2}
                  alt="image"
                  width={300}
                  height={300}
                  style={{ width: '95%', height: 'auto', margin: '10px 0' }}
                />

                <Box
                  sx={{
                    padding: '16px 24px',
                    backgroundColor: '#52626E',
                    borderRadius: '24px',
                    width: {
                      xs: '100%',
                      sm: '90%',
                      md: '360px',
                      lg: '350px',
                    },
                    height: '145px',
                  }}
                >
                  <Typography
                    variant="h4"
                    sx={{
                      width: '95%',
                      height: '100px',
                      fontFamily: 'var(--font-manrope), sans-serif;',
                      fontWeight: 600,
                      fontSize: '20px',
                      lineHeight: '24px',
                      letterSpacing: '0px',
                      color: '#F5F5F5',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    Missed Product Conversion Opportunities
                  </Typography>
                </Box>
              </Box>

              <Typography
                className="banks-heading"
                sx={{
                  fontSize: { xs: '40px', sm: '48px', md: '56px', lg: '64px' },
                  lineHeight: '56px',
                  color: '#444444',
                  fontFamily: 'var(--font-darker-grotesque), sans-serif',
                  fontWeight: 600,
                  textAlign: { xs: 'left', lg: 'right' },
                  marginRight: { xs: 0, md: 6 },
                }}
              >
                Banks Face
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default ImagesAndCards
