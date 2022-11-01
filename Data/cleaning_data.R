library(tidyverse)
library(ggplot2)
library(dplyr )

rm(list=ls())
setwd("C:/Users/17086/OneDrive - The University of Chicago/Documents/GitHub/CAPP30239_FA22/week_03/Data")


lapop <- read.csv("lapop_2021US.csv")

lapop <- select(lapop, idnum,	uniq_id,	year,	estratopri,	strata,	upm,	prov1t,	
                  q1tb,	q2,	wt,	weight1500,	idio2,	fs2,	it1,
                  l1b,	vic1ext,	pole2n,	aoj11,	wvsi2,	wvsi3,	cses6n,	b2,	b3,	b4,	b6,	b32,	
                  b37,	b47a,	b21a,	b43, ed_usa)

##English labels

lapop$ed_usa[lapop$ed_usa == 'Titulo universitario de 4 aÃ±os'] <- "4-year college degree"
lapop$ed_usa[lapop$ed_usa == 'Algo de universidad, pero sin titulo (todavia)'] <- "Some college, but no degree (yet)"
lapop$ed_usa[lapop$ed_usa == 'Titulo universitario de 2 aÃ±os'] <- "2-year college degree"
lapop$ed_usa[lapop$ed_usa == 'Graduado de secundaria'] <- "High school graduate"
lapop$ed_usa[lapop$ed_usa == 'Postgrado (MA, MBA, MD, JD, PHD, etc.)'] <- "Postgraduate degree (MA, MBA, MD, JD, PhD, etc.)"
lapop$ed_usa[lapop$ed_usa == 'No se graduo de la escuela secundaria'] <- "Did not graduate from high school"


lapop[lapop == "No responde"] <- na

lapop$q1tb[lapop$q1tb == 'Mujer/femenino'] <- 'female'
lapop$q1tb[lapop$q1tb == 'Hombre/masculino'] <- 'male'

lapop$idio2[lapop$idio2 == 'Mejor'] <- 'better'
lapop$idio2[lapop$idio2 == 'Peor'] <- 'worse'
lapop$idio2[lapop$idio2 == 'Igual'] <- 'same'


lapop$fs2[lapop$fs2 == 'Si­'] <- 1
lapop$fs2[lapop$fs2 == 'No'] <- 0

lapop$it1[lapop$it1 == "Muy confiable"] <- "Very trustworthy"
lapop$it1[lapop$it1 == "Algo confiable"] <- "Somewhat trustworthy"
lapop$it1[lapop$it1 == "Poco confiable"] <- "Not very trustworthy"
lapop$it1[lapop$it1 == "Nada confiable"] <- "Untrustworthy"

lapop$l1b[lapop$l1b == 'Conservador'] <- 10
lapop$l1b[lapop$l1b == 'Liberal'] <- 1


lapop$vic1ext[lapop$vic1ext == 'Si­'] <- 1
lapop$vic1ext[lapop$vic1ext == 'No'] <- 0


lapop$pole2n[lapop$pole2n == "Muy satisfecho(a)"] <- "very satisfied"
lapop$pole2n[lapop$pole2n == "Satisfecho(a)"] <- "satisfied"
lapop$pole2n[lapop$pole2n == "Insatisfecho(a)"] <- "dissatisfied"
lapop$pole2n[lapop$pole2n == "Muy insatisfecho(a)"] <- "very dissatisfied"

lapop$pn4[lapop$pn4 == "Muy satisfecho(a)"] <- "very satisfied"
lapop$pn4[lapop$pn4 == "Satisfecho(a)"] <- "satisfied"
lapop$pn4[lapop$pn4 == "Insatisfecho(a)"] <- "dissatisfied"
lapop$pn4[lapop$pn4 == "Muy insatisfecho(a)"] <- "very dissatisfied"

lapop$aoj11[lapop$aoj11 == "Muy seguro(a)"] <- "Very safe"
lapop$aoj11[lapop$aoj11 == "Algo seguro(a)"] <- "safe"
lapop$aoj11[lapop$aoj11 == "Algo inseguro(a)"] <- "Somewhat unsafe"
lapop$aoj11[lapop$aoj11 == "Muy inseguro(a)"] <- "Very unsafe"

lapop$wvsi2[lapop$wvsi2 == "Ciudadanos voten directamente"] <- "Citizens vote directly"
lapop$wvsi2[lapop$wvsi2 == "Representantes electos"] <- "Elected representatives"

lapop$wvsi3[lapop$wvsi3 == "Un grupo de expertos"] <- "A group of experts"
lapop$wvsi3[lapop$wvsi3 == "Representantes electos"] <- "Elected representatives"



lapop$cses6n[lapop$cses6n == "Muy bueno"] <- "Very Good"
lapop$cses6n[lapop$cses6n == "Bueno"] <- "Good"
lapop$cses6n[lapop$cses6n == "Ni bueno ni malo"] <- "Neither Good nor Bad"
lapop$cses6n[lapop$cses6n == "Malo"] <- "Bad"
lapop$cses6n[lapop$cses6n == "Muy malo"] <- "Very bad"

lapop$b2[lapop$b2 == "Mucho"] <- 7
lapop$b2[lapop$b2 == "Nada"] <- 1

lapop$b3[lapop$b3 == "Mucho"] <- 7
lapop$b3[lapop$b3 == "Nada"] <- 1

lapop$b4[lapop$b4 == "Mucho"] <- 7
lapop$b4[lapop$b4 == "Nada"] <- 1

lapop$b6[lapop$b6 == "Mucho"] <- 7
lapop$b6[lapop$b6 == "Nada"] <- 1

lapop$b32[lapop$b32 == "Mucho"] <- 7
lapop$b32[lapop$b32 == "Nada"] <- 1

lapop$b37[lapop$b37 == "Mucho"] <- 7
lapop$b37[lapop$b37 == "Nada"] <- 1

lapop$b47a[lapop$b47a == "Mucho"] <- 7
lapop$b47a[lapop$b47a == "Nada"] <- 1

lapop$b21a[lapop$b21a == "Mucho"] <- 7
lapop$b21a[lapop$b21a == "Nada"] <- 1

lapop$b43[lapop$b43 == "Mucho"] <- 7
lapop$b43[lapop$b43 == "Nada"] <- 1


#####Into numbers

lapop[lapop == "No responde"] <- NA

lapop$q1tb[lapop$q1tb == 'Mujer/femenino'] <- 1
lapop$q1tb[lapop$q1tb == 'Hombre/masculino'] <- 0


lapop$idio2[lapop$idio2 == 'Mejor'] <- 1
lapop$idio2[lapop$idio2 == 'Igual'] <- 0
lapop$idio2[lapop$idio2 == 'Peor'] <- 0

lapop$ed_usa[lapop$ed_usa == 'Titulo universitario de 4 aÃ±os'] <- "4-year college degree"
lapop$ed_usa[lapop$ed_usa == 'Algo de universidad, pero sin titulo (todavia)'] <- "Some college, but no degree (yet)"
lapop$ed_usa[lapop$ed_usa == 'Titulo universitario de 2 aÃ±os'] <- "2-year college degree"
lapop$ed_usa[lapop$ed_usa == 'Graduado de secundaria'] <- "High school graduate"
lapop$ed_usa[lapop$ed_usa == 'Postgrado (MA, MBA, MD, JD, PHD, etc.)'] <- "Postgraduate degree (MA, MBA, MD, JD, PhD, etc.)"
lapop$ed_usa[lapop$ed_usa == 'No se graduo de la escuela secundaria'] <- "Did not graduate from high school"



lapop$fs2[lapop$fs2 == 'Si­'] <- 1
lapop$fs2[lapop$fs2 == 'No'] <- 0

lapop$it1[lapop$it1 == "Muy confiable"] <- 10
lapop$it1[lapop$it1 == "Algo confiable"] <- 7.5
lapop$it1[lapop$it1 == "Poco confiable"] <- 5
lapop$it1[lapop$it1 == "Nada confiable"] <- 2.5

lapop$l1b[lapop$l1b == 'Conservador'] <- 10
lapop$l1b[lapop$l1b == 'Liberal'] <- 1


lapop$vic1ext[lapop$vic1ext == 'Si­'] <- 1
lapop$vic1ext[lapop$vic1ext == 'No'] <- 0


lapop$pole2n[lapop$pole2n == "Muy satisfecho(a)"] <- 10
lapop$pole2n[lapop$pole2n == "Satisfecho(a)"] <- 7.5
lapop$pole2n[lapop$pole2n == "Insatisfecho(a)"] <- 5
lapop$pole2n[lapop$pole2n == "Muy insatisfecho(a)"] <- 2.5

lapop$pn4[lapop$pn4 == "Muy satisfecho(a)"] <- 10
lapop$pn4[lapop$pn4 == "Satisfecho(a)"] <- 7.5
lapop$pn4[lapop$pn4 == "Insatisfecho(a)"] <- 5
lapop$pn4[lapop$pn4 == "Muy insatisfecho(a)"] <- 2.5

lapop$aoj11[lapop$aoj11 == "Muy seguro(a)"] <- 10
lapop$aoj11[lapop$aoj11 == "Algo seguro(a)"] <- 7.5
lapop$aoj11[lapop$aoj11 == "Algo inseguro(a)"] <- 5
lapop$aoj11[lapop$aoj11 == "Muy inseguro(a)"] <- 2.5

lapop$wvsi2[lapop$wvsi2 == "Ciudadanos voten directamente"] <- 1
lapop$wvsi2[lapop$wvsi2 == "Representantes electos"] <- 0

lapop$wvsi3[lapop$wvsi3 == "Un grupo de expertos"] <- 1
lapop$wvsi3[lapop$wvsi3 == "Representantes electos"] <- 0



lapop$cses6n[lapop$cses6n == "Muy bueno"] <- 10
lapop$cses6n[lapop$cses6n == "Bueno"] <- 7.5
lapop$cses6n[lapop$cses6n == "Ni bueno ni malo"] <- 5
lapop$cses6n[lapop$cses6n == "Malo"] <- 2.5
lapop$cses6n[lapop$cses6n == "Muy malo"] <- 0

lapop$b2[lapop$b2 == "Mucho"] <- 7
lapop$b2[lapop$b2 == "Nada"] <- 1

lapop$b3[lapop$b3 == "Mucho"] <- 7
lapop$b3[lapop$b3 == "Nada"] <- 1

lapop$b4[lapop$b4 == "Mucho"] <- 7
lapop$b4[lapop$b4 == "Nada"] <- 1

lapop$b6[lapop$b6 == "Mucho"] <- 7
lapop$b6[lapop$b6 == "Nada"] <- 1

lapop$b32[lapop$b32 == "Mucho"] <- 7
lapop$b32[lapop$b32 == "Nada"] <- 1

lapop$b37[lapop$b37 == "Mucho"] <- 7
lapop$b37[lapop$b37 == "Nada"] <- 1

lapop$b47a[lapop$b47a == "Mucho"] <- 7
lapop$b47a[lapop$b47a == "Nada"] <- 1

lapop$b21a[lapop$b21a == "Mucho"] <- 7
lapop$b21a[lapop$b21a == "Nada"] <- 1

lapop$b43[lapop$b43 == "Mucho"] <- 7
lapop$b43[lapop$b43 == "Nada"] <- 1


write.csv(lapop,"C:/Users/17086/OneDrive - The University of Chicago/Documents/GitHub/CAPP30239_FA22/Data/lapop_cleaned.csv", row.names = FALSE)





