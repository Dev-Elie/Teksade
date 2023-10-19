"use client";
/* eslint-disable @next/next/no-img-element */
import {
  Button,
  Collapse,
  Menu,
  Select,
  TextInput,
  MultiSelect,
} from "@mantine/core";
import { BsFilter, BsFire, BsSearch } from "react-icons/bs";
import { VscDiffAdded } from "react-icons/vsc";
import React, { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { countries, techFocusAreas } from "@/utils/constants";
import { useMantineColorScheme } from "@mantine/core";
import { useDebounce } from "use-debounce";
import CommunityCardSkeleton from "../custom-components/skeletons/Community/CommunityCard";
import CustomButton from "../custom-components/button";
import { api } from "@/trpc/react";
import Container from "../custom-components/container";
import CommmunityCard from "../sections/CommmunityCard";

export default function CommunitiesPage() {
  const [limit, setLimit] = useState(10);
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [filterByNewlyCreated, setFilterByNewlyCreated] = useState(false);
  const [selectedTechnologies] = useState<string[]>(
    [],
  );
  const [selectedFocusAreas, setSelectedFocusares] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [debouncedValue] = useDebounce(debouncedSearchTerm, 500);

  const { colorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";
  const communitiesList = api.communities.getCommunitiesList.useQuery({
    limit: limit,
    country: selectedCountry,
    filterByNew: filterByNewlyCreated,
    focusAreas: selectedFocusAreas,
    technologies: selectedTechnologies,
    searchTerm: debouncedValue,
  });
  const [filtersOpen, { toggle }] = useDisclosure(false);

  useEffect(() => {
    setDebouncedSearchTerm(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    void communitiesList.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleShowMore = () => {
    setLimit((prevLimit) => prevLimit + 20);
  };

  const mightHaveMore = communitiesList.data?.length === limit;

  return (
    <>
        <Container>
          <div className="">
            <section className="my-8 flex w-full items-center justify-between ">
              <Menu trigger="hover" openDelay={100} closeDelay={4000}>
                <Menu.Target>
                  <Button
                    variant="subtle"
                    rightSection={<BsFilter />}
                    className={`shadow-lg" flex items-center gap-x-2 p-2 text-base ${
                      dark ? "text-slate-400" : "text-slate-600"
                    }`}
                  >
                    Popularity
                  </Button>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={() => setFilterByNewlyCreated(false)}
                    rightSection={<BsFire />}
                  >
                    Popular
                  </Menu.Item>
                  <Menu.Item
                    onClick={() => setFilterByNewlyCreated(true)}
                    rightSection={<VscDiffAdded />}
                  >
                    Newly Created
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

              <Button
                onClick={toggle}
                variant="subtle"
                rightSection={<BsFilter />}
                className={`shadow-lg" flex items-center gap-x-2 p-2 px-4 text-base ${
                  dark ? "text-slate-400" : "text-slate-600"
                }`}
              >
                Filters
              </Button>
            </section>
            <Collapse in={filtersOpen}>
              <div className="my-5 flex w-full flex-col  gap-2 sm:flex sm:flex-row sm:items-center sm:justify-between">
                <TextInput
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  radius="xl"
                  rightSection={<BsSearch className="flex" />}
                  placeholder="Search by name"
                  className="flex-1"
                />
                <MultiSelect
                  data={techFocusAreas}
                  placeholder="Focus areas e.g. AI, Blockchain"
                  value={selectedFocusAreas}
                  onChange={setSelectedFocusares}
                  searchable
                  clearButtonProps={{ "aria-label": "Clear selection" }}
                  clearable
                  className=" flex-1"
                  radius="xl"
                />

                {/*TODO:This Multiselect is causing a runtime error  : It needs fixing      */}
                {/* <MultiSelect
                  data={technologies}
                  placeholder="Related Technologies e.g. React, Python"
                  value={selectedTechnologies}
                  onChange={setSelectedTechnologies}
                  searchable
                  clearButtonProps={{ "aria-label": "Clear selection" }}
                  clearable
                  className=" flex-1"
                  radius="xl"
                /> */}

                <Select
                  clearable
                  radius="xl"
                  data={countries}
                  searchable
                  placeholder="Country"
                  value={selectedCountry}
                  onChange={(val) => setSelectedCountry(val ?? "")}
                  className=" flex-1"
                />
              </div>
            </Collapse>
          </div>
          {communitiesList.isLoading && (
            <section className="grid grid-cols-1 gap-1 gap-x-2 sm:grid-cols-3 md:grid-cols-3 ">
              <CommunityCardSkeleton />
              <CommunityCardSkeleton />
              <CommunityCardSkeleton />
            </section>
          )}
          <section className="grid grid-cols-1 gap-1 gap-x-2 sm:grid-cols-3 md:grid-cols-3 ">
            {communitiesList.data?.length
              ? communitiesList.data.map((community) => (
                  <>
                    {community.published && (
                      <CommmunityCard
                        id={community.id}
                        key={community.id}
                        name={community.name}
                        country={community.country}
                        location={community.location}
                        description={community.description}
                        members={community._count.members}
                        logoUrl={community.logo_link}
                        verified={community.verified ?? false}
                      />
                    )}
                  </>
                ))
              : !communitiesList.isLoading && (
                  <div className="my-20 text-center sm:col-span-3 md:col-span-4">
                    It looks like there aren&apos;t any communities that fit
                    those specifics. Don&apos;t worry—adjusting your filters
                    might help!
                  </div>
                )}
          </section>
          {mightHaveMore && (
            <div className="my-6 flex justify-center">
              <CustomButton
                size="lg"
                className="text-base"
                variant="filled"
                type="submit"
                title={communitiesList.isLoading ? "Loading..." : "Show More"}
                onClickHandler={handleShowMore}
              />
            </div>
          )}
        </Container>
    </>
  );
}
