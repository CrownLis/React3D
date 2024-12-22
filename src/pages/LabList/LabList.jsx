import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Flex, Row, Select, Spin, Typography } from 'antd';

import { formatName } from './utils/formatName';
import { useGetResourcesQuery } from '../../store/yandex';
import { Lab } from '../Lab/Lab';
import { Model } from '../Model';

export const LabList = () => {
  const [subjects, setSubjects] = useState();
  const [currentSubject, setCurrentSubject] = useState();
  const [books, setBooks] = useState();
  const [currentBook, setCurrentBook] = useState();
  const [chapters, setChapters] = useState();
  const [currentChapter, setCurrentChapter] = useState();
  const [models, setModels] = useState();
  const [currentModel, setCurrentModel] = useState();

  const { currentData: resources, isFetching } = useGetResourcesQuery({
    path: 'subjects',
    refetchOnMountOrArgChange: true,
  });

  const { currentData: resourcesBooks, isFetching: isFetchingBooks } = useGetResourcesQuery({
    path: `/subjects/${currentSubject}`,
    refetchOnMountOrArgChange: true,
  },
{
  skip: !currentSubject
}
);

  const { currentData: resourcesChapters, isFetching: isFetchingChapters } = useGetResourcesQuery({
    path: `/subjects/${currentSubject}/${currentBook}`,
    refetchOnMountOrArgChange: true,
  },
  {
    skip: !currentSubject || !currentBook
  }
);

  const { currentData: resourcesModels, isFetching: isFetchingModels } = useGetResourcesQuery({
    path: `/subjects/${currentSubject}/${currentBook}/${currentChapter}/models`,
    refetchOnMountOrArgChange: true,
  },
  {
    skip: !currentSubject || !currentBook || !currentChapter
  }
);

  const getSubjects = () => {
    const arraySubjects = [];
    resources.map(resource => {
      const { name: formattedName } = formatName(resource.name, resource.type);
      arraySubjects.push({ value: formattedName, label: formattedName });
    })
    setSubjects(arraySubjects)
  }

  const getBooks = () => {
    const arrayBooks = [];
    resourcesBooks.map(resource => {
      const { name: formattedName } = formatName(resource.name, resource.type);
      arrayBooks.push({ value: formattedName, label: formattedName });
    })
    setBooks(arrayBooks)
  }

  const getChapters = () => {
    const arrayChapters = [];
    resourcesChapters.map(resource => {
      const { name: formattedName } = formatName(resource.name, resource.type);
      arrayChapters.push({ value: formattedName, label: formattedName });
    })
    setChapters(arrayChapters)
  }

  const getModels = () => {
    const arrayModels = [];
    resourcesModels.map(resource => {
      const { name: formattedName } = formatName(resource.name, resource.type);
      arrayModels.push({ value: formattedName, label: formattedName });
    })
    setModels(arrayModels)
  }

  useEffect(() => {
    if (resources) {
      getSubjects()
    }
    if (resourcesBooks) {
      getBooks()
    }
    if (resourcesChapters) {
      getChapters()
    }
    if (resourcesModels) {
      getModels()
    }
  }, [resources, resourcesBooks, resourcesChapters, resourcesModels])



  return (
    <Flex vertical gap={20} justify='center' style={{height: '100%'}}>
      <Typography.Title style={{ textAlign: 'center', backgroundColor: '#007acc', margin: 0, padding: '16px 0px', color: 'white' }} level={1}>Образовательная платформа</Typography.Title>
      {isFetching ? (
        <Spin size="large" />
      ) : (
        <Flex justify='space-between' style={{margin: '8px 18px', height: '100%'}}>
          <Col span={6} style={{backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)', padding: 20}}>
            <Typography.Paragraph style={{ textAlign: 'center', color: 'black' }}>Выберите предмет</Typography.Paragraph>
            <Select style={{ width: '100%' }} options={subjects} onChange={(subject) => {
              setCurrentSubject(subject)
              setCurrentBook()
              setCurrentChapter()
              setCurrentModel()
              }} />
            <Typography.Paragraph style={{ textAlign: 'center', color: 'black' }}>Выберите книгу</Typography.Paragraph>
            <Select style={{ width: '100%' }} options={books} onChange={(book) => {
              setCurrentBook(book)
              setCurrentChapter()
              setCurrentModel()
              }} disabled={isFetchingBooks || !currentSubject} />
            <Typography.Paragraph style={{ textAlign: 'center', color: 'black' }}>Выберите раздел</Typography.Paragraph>
            <Select style={{ width: '100%' }} options={chapters} onChange={(chapter) => {
              setCurrentChapter(chapter)
              setCurrentModel()
              }} disabled={isFetchingChapters || !currentBook} />
          </Col>
          <Col span={10} style={{backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)', padding: 20}}>
          {currentChapter &&
            <Lab path={`/subjects/${currentSubject}/${currentBook}/${currentChapter}`} />
          }
          </Col>
          <Col span={7} style={{backgroundColor: 'white', borderRadius: 8, boxShadow: '0 2px 5px rgba(0,0,0,0.1)', padding: 20}}>
          {currentChapter &&
          <div style={{display: 'flex', flexDirection: 'column', height: '100%'}}>
          <Typography.Paragraph style={{ textAlign: 'center', color: 'black' }}>Выберите интересующее вас оборудование из данного раздела</Typography.Paragraph>
            <Select style={{ width: '100%' }} options={models} value={currentModel} onChange={(model) => setCurrentModel(model)} />
            {currentModel &&
            <Model path={`/subjects/${currentSubject}/${currentBook}/${currentChapter}/models/${currentModel}/${currentModel}`} currentModel={currentModel}/>
            }
            </div>
            }
          </Col>
        </Flex>
      )}
    </Flex>
  );
};
