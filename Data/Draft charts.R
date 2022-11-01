library(tidyverse)
library(ggplot2)
library(dplyr )

rm(list=ls())
setwd("C:/Users/17086/OneDrive - The University of Chicago/Documents/GitHub/CAPP30239_FA22/Data")

lapop <- read.csv("lapop_cleaned.csv")

#q1tb, gender

#q2 age
#idio2 "Do you think that your current economic situation is better, the same or worse than it was twelve months ago?"

#fs2 "In the past three months, because of a lack of money or other resources, did your household ever run out of food?"

#it1  "Speaking of the people from around your community, would you say that people in your community are very trustworthy, somewhat trustworthy, not very trustworthy or untrustworthy?"

#l1b "liberals vs conservative"

#vic1ext "Now, changing the subject, have you been a victim of any type of crime in the past 12 months? That is, have you been a victim of robbery, burglary, assault, 
#fraud, blackmail, extortion, violent threats, or any other type of crime in the past 12 months?"


#pole2n "In general, are you very satisfied, satisfied, dissatisfied, or very dissatisfied with the performance of
#the police in your neighborhood?"


#aoj11 "Speaking of the neighborhood where you live and thinking of the possibility of being assaulted or
#robbed, do you feel very safe, somewhat safe, somewhat unsafe or very unsafe?"

#wvsi2 "In deciding what laws to make, what do you think is best for the United States: should elected
#representatives of the people decide, or should citizens vote directly to decide each issue?"

#wvsi3 "In deciding what laws to make, what do you think is best for the United States: should a group of
#experts decide or representatives elected by the people decide?"

#cses6n "Having a strong leader in the government, even if the leader bends the rules to get things done.
#Would you say that it is very good, good, neither good nor bad, bad, or very bad as a form of government
#for our country?"	

#b2 "To what extent do you respect the political institutions of the United States?"

#b3 "To what extent do you think that citizens' basic rights are well protected by the political system of the
#United States?"

#b4 "To what extent do you feel proud of living under the political system of the United States?"

#b6 "To what extent do you think that one should support the political system of the United States?"

#b32 "To what extent do you trust the local or municipal government?"	

#b37 "To what extent do you trust the mass media?"

#b47a "To what extent do you trust elections in this country?"

#b21a "To what extent do you trust the President?"

#b43 "To what extent are you proud of being American?"

#lapop$b32 <- as.numeric(lapop$b32)

lapop <- lapop %>% mutate_at(c("q1tb",	"q2", "b43", "idio2"), as.numeric)

lapop <- lapop %>%
  group_by(prov1t) %>%
  mutate(tot_wt = sum(weight1500))

lapop_by <- na.omit(lapop) %>%
  group_by(prov1t, estratopri) %>%
  summarize(mean_conservative = weight1500*l1b/tot_wt, mean_age =  weight1500*q2/tot_wt, vulnerability_rate =  weight1500*fs2/tot_wt, 
            mean_confidence_comunity =  weight1500*it1/tot_wt, rate_victims =  weight1500*vic1ext/tot_wt/tot_wt, mean_police_satisfaction =  weight1500*pole2n/tot_wt,
            mean_neighborhood_security =  weight1500*aoj11/tot_wt, rate_direct_vote =  weight1500*wvsi2/tot_wt, rate_experts =  weight1500*wvsi3/tot_wt, 
            mean_strong_leaders_support =  weight1500*cses6n/tot_wt, mean_institutions_respect =  weight1500*b2/tot_wt,
            mean_system_pride =  weight1500*b4/tot_wt, mean_system_support =  weight1500*b6/tot_wt, mean_local_gov_trust =  weight1500*b32/tot_wt,
            mean_mass_media_trust =  weight1500*b37/tot_wt, mean_lelections_trust =  weight1500*b47a/tot_wt, mean_president_trust =  weight1500*b21a/tot_wt,
            mean_american_pride =  weight1500*b43/tot_wt, rate_economy_worse =  weight1500*idio2/tot_wt)

lapop_by_state <- na.omit(lapop_by) %>%
  group_by(prov1t, estratopri) %>%
  summarize(mean_conservative = sum(mean_conservative), mean_age = sum(mean_age), vulnerability_rate = sum(vulnerability_rate), 
            mean_confidence_comunity = sum(mean_confidence_comunity), rate_victims = sum(rate_victims), mean_police_satisfaction = sum(mean_police_satisfaction),
            mean_neighborhood_security = sum(mean_neighborhood_security), rate_direct_vote = sum(rate_direct_vote), rate_experts = sum(rate_experts), 
            mean_strong_leaders_support = sum(mean_strong_leaders_support), mean_institutions_respect = sum(mean_institutions_respect),
            mean_system_pride = sum(mean_system_pride), mean_system_support = sum(mean_system_support), mean_local_gov_trust = sum(mean_local_gov_trust),
            mean_mass_media_trust = sum(mean_mass_media_trust), mean_lelections_trust = sum(mean_lelections_trust), mean_president_trust = sum(mean_president_trust),
            mean_american_pride = sum(mean_american_pride), rate_economy_worse = sum(rate_economy_worse))

lapop_by_state$highlight <- as.numeric(lapop_by_state$prov1t == "Illinois")


ggplot(lapop_by_state, aes(rate_victims, mean_police_satisfaction, colour = estratopri)) + 
  geom_point() + 
  ggtitle('Crime vs Satisfaction with Police') +
  xlab("Likelihood of being victime of a crime") + ylab("Satisfaction with police") +
  guides(color = guide_legend(title = "Region"))

ggplot(lapop_by_state, aes(mean_conservative, mean_police_satisfaction, colour = estratopri)) + 
  geom_point() + 
  ggtitle('Conservative attitudes vs Satisfaction with Police') +
  xlab("Conservative attitudes") + ylab("Satisfaction with police") +
  guides(color = guide_legend(title = "Region"))

ggplot(lapop_by_state, aes(rate_economy_worse, mean_local_gov_trust, colour = estratopri)) + 
  geom_point() + 
  ggtitle('Economic situation VS trust in local government') +
  xlab("Rate of subjective economical improvements") + ylab("Trust in local government") +
  guides(color = guide_legend(title = "Region"))



ggplot(lapop_by_state, aes(reorder(prov1t, mean_police_satisfaction), mean_police_satisfaction, fill=highlight)) +
  theme(legend.position = "none") +
  geom_bar(stat = "identity", position="stack") +
  coord_flip() +
  labs(title = "Satisfaction with the police", x="State", y="Satistfaction")

ggplot(lapop_by_state, aes(reorder(prov1t, mean_local_gov_trust), mean_local_gov_trust, fill=highlight, colour = estratopri)) +
  geom_bar(stat = "identity", position="stack") +
  coord_flip() +
  labs(title = "Satisfaction with Local Government", x="State", y="Satisfaction") +
  guides(color = guide_legend(title = "Region"))


write.csv(lapop_by_state,"C:/Users/17086/OneDrive - The University of Chicago/Documents/GitHub/CAPP30239_FA22/Data/lapop_by_state.csv", row.names = FALSE)



######By educ

lapop_by_state_by_educ <- na.omit(lapop_by) %>%
  group_by(prov1t, estratopri, ed_usa) %>%
  summarize(mean_conservative = sum(mean_conservative), mean_age = sum(mean_age), vulnerability_rate = sum(vulnerability_rate), 
            mean_confidence_comunity = sum(mean_confidence_comunity), rate_victims = sum(rate_victims), mean_police_satisfaction = sum(mean_police_satisfaction),
            mean_neighborhood_security = sum(mean_neighborhood_security), rate_direct_vote = sum(rate_direct_vote), rate_experts = sum(rate_experts), 
            mean_strong_leaders_support = sum(mean_strong_leaders_support), mean_institutions_respect = sum(mean_institutions_respect),
            mean_system_pride = sum(mean_system_pride), mean_system_support = sum(mean_system_support), mean_local_gov_trust = sum(mean_local_gov_trust),
            mean_mass_media_trust = sum(mean_mass_media_trust), mean_lelections_trust = sum(mean_lelections_trust), mean_president_trust = sum(mean_president_trust),
            mean_american_pride = sum(mean_american_pride), rate_economy_worse = sum(rate_economy_worse))


ggplot(lapop_by_state_by_educ, aes(reorder(ed_usa, mean_police_satisfaction), mean_police_satisfaction, fill=highlight)) +
  theme(legend.position = "none") +
  geom_bar(stat = "identity", position="stack") +
  coord_flip() +
  labs(title = "Satisfaction with the police", x="Satisfaction", y="State")

ggplot(lapop_by_state, aes(reorder(prov1t, mean_local_gov_trust), mean_local_gov_trust, fill=highlight, colour = estratopri)) +
  geom_bar(stat = "identity", position="stack") +
  coord_flip() +
  labs(title = "Satisfaction with Local Government", x="Satisfaction", y="State") +
  guides(color = guide_legend(title = "Region"))



