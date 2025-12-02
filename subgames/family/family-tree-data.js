// 家族树数据结构

// 简单ID生成器
let memberIdCounter = 0;
const generateId = (type) => {
  return `${type}_${memberIdCounter++}`;
};

// 生成随机姓名
const generateRandomName = (gender, surname) => {
  const maleNames = ['伟', '强', '磊', '洋', '勇', '军', '杰', '涛', '超', '明', '辉', '鹏', '华', '平', '建', '波', '斌', '宇', '晨', '昊'];
  const femaleNames = ['芳', '娜', '敏', '静', '丽', '艳', '洁', '燕', '霞', '萍', '玲', '红', '梅', '琳', '婷', '慧', '巧', '美', '倩', '雪'];
  const names = gender === 'male' ? maleNames : femaleNames;
  const randomName = names[Math.floor(Math.random() * names.length)];
  return surname + randomName;
};

// 生成家族树
const generateFamilyTree = () => {
  // 根据中国的常见姓氏
  const commonSurnames = ['张', '王', '李', '赵', '刘', '陈', '杨', '黄', '周', '吴'];
  
  // 选择初始夫妻的姓氏
  const husbandSurname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)];
  const wifeSurname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)];
  
  // 初始夫妻
  const rootHusband = {
    id: 'root_husband',
    name: generateRandomName('male', husbandSurname),
    surname: husbandSurname,
    gender: 'male',
    generation: 0,
    x: 400,
    y: 300,
    spouseId: 'root_wife',
    parentIds: [],
    childrenIds: []
  };
  
  const rootWife = {
    id: 'root_wife',
    name: generateRandomName('female', wifeSurname),
    surname: wifeSurname,
    gender: 'female',
    generation: 0,
    x: 500,
    y: 300,
    spouseId: 'root_husband',
    parentIds: [],
    childrenIds: []
  };
  
  const familyTree = {
    'root_husband': rootHusband,
    'root_wife': rootWife
  };
  
  // 设置夫妻关系
  rootHusband.spouseId = 'root_wife';
  rootWife.spouseId = 'root_husband';
  
  // 递归生成家族树（最多4层）
  const generateFamily = (personId, currentGeneration, direction) => {
    if (currentGeneration >= 4) return; // 限制在4层内
    
    const person = familyTree[personId];
    if (!person) return;
    
    // 检查是否为有效对象，避免字符串错误
    if (typeof person !== 'object') {
      console.error('Invalid person object:', personId, person);
      return;
    }
    
    // 避免无限循环 - 确保基本属性存在
    if (!person.childrenIds) person.childrenIds = [];
    if (!person.parentIds) person.parentIds = [];
    
    // 生成父母
    if (direction === 'up' || !direction) {
      generateParents(person, currentGeneration);
    }
    
    // 生成子女
    if (direction === 'down' || !direction) {
      generateChildren(person, currentGeneration);
    }
  };
  
  // 生成父母
  const generateParents = (person, generation) => {
    if (generation >= 4) return;
    
    // 避免重复生成父母
    if (person.parentIds && person.parentIds.length > 0) return;
    
    // 父亲
    const fatherId = generateId('father');
    const fatherSurname = person.gender === 'male' ? person.surname : person.surname;
    const father = {
      id: fatherId,
      name: generateRandomName('male', fatherSurname),
      surname: fatherSurname,
      gender: 'male',
      generation: generation + 1,
      x: person.x - 150,
      y: person.y - 120,
      spouseId: null,
      parentIds: [],
      childrenIds: [person.id]
    };
    
    // 母亲
    const motherId = generateId('mother');
    const motherSurname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)];
    const mother = {
      id: motherId,
      name: generateRandomName('female', motherSurname),
      surname: motherSurname,
      gender: 'female',
      generation: generation + 1,
      x: person.x - 50,
      y: person.y - 120,
      spouseId: fatherId,
      parentIds: [],
      childrenIds: [person.id]
    };
    
    // 建立夫妻关系
    father.spouseId = motherId;
    father.childrenIds = [person.id];
    mother.childrenIds = [person.id];
    
    // 添加到家族树
    familyTree[fatherId] = father;
    familyTree[motherId] = mother;
    
    // 更新当前人的父母信息
    person.parentIds = [fatherId, motherId];
    
    // 继续向上扩展（但限制递归深度）
    if (generation < 3) {
      generateFamily(fatherId, generation + 1, 'up');
      generateFamily(motherId, generation + 1, 'up');
    }
  };
  
  // 生成子女
  const generateChildren = (person, generation) => {
    if (generation >= 4) return;
    
    // 只有已婚的人才有子女
    if (!person.spouseId) return;
    
    const spouse = familyTree[person.spouseId];
    if (!spouse) return;
    
    // 确保 childrenIds 数组存在
    if (!person.childrenIds) person.childrenIds = [];
    if (!spouse.childrenIds) spouse.childrenIds = [];
    
    // 避免重复生成子女
    if (person.childrenIds.length > 0) return;
    
    // 生成儿子
    const sonSurname = person.gender === 'male' ? person.surname : spouse.surname;
    const sonId = generateId('son');
    const son = {
      id: sonId,
      name: generateRandomName('male', sonSurname),
      surname: sonSurname,
      gender: 'male',
      generation: generation + 1,
      x: person.x + 100,
      y: person.y + 120,
      spouseId: null,
      parentIds: [person.id, person.spouseId],
      childrenIds: []
    };
    
    // 生成女儿
    const daughterId = generateId('daughter');
    const daughter = {
      id: daughterId,
      name: generateRandomName('female', sonSurname),
      surname: sonSurname,
      gender: 'female',
      generation: generation + 1,
      x: person.x + 200,
      y: person.y + 120,
      spouseId: null,
      parentIds: [person.id, person.spouseId],
      childrenIds: []
    };
    
    // 添加到家族树
    familyTree[sonId] = son;
    familyTree[daughterId] = daughter;
    
    // 更新父母的子女信息
    person.childrenIds.push(sonId, daughterId);
    spouse.childrenIds.push(sonId, daughterId);
    
    // 为儿子生成配偶
    const sonSpouseId = generateId('spouse');
    const sonSpouseSurname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)];
    const sonSpouse = {
      id: sonSpouseId,
      name: generateRandomName('female', sonSpouseSurname),
      surname: sonSpouseSurname,
      gender: 'female',
      generation: generation + 1,
      x: son.x + 100,
      y: son.y,
      spouseId: sonId,
      parentIds: [],
      childrenIds: []
    };
    
    son.spouseId = sonSpouseId;
    familyTree[sonSpouseId] = sonSpouse;
    
    // 为女儿生成配偶
    const daughterSpouseId = generateId('spouse');
    const daughterSpouseSurname = commonSurnames[Math.floor(Math.random() * commonSurnames.length)];
    const daughterSpouse = {
      id: daughterSpouseId,
      name: generateRandomName('male', daughterSpouseSurname),
      surname: daughterSpouseSurname,
      gender: 'male',
      generation: generation + 1,
      x: daughter.x + 100,
      y: daughter.y,
      spouseId: daughterId,
      parentIds: [],
      childrenIds: []
    };
    
    daughter.spouseId = daughterSpouseId;
    familyTree[daughterSpouseId] = daughterSpouseId;
    
    // 先将所有新成员添加到familyTree
    const newMembers = [son, daughter, sonSpouse, daughterSpouse];
    newMembers.forEach(member => {
      familyTree[member.id] = member;
    });
    
    // 继续向下扩展（但限制递归深度）
    if (generation < 3) {
      generateFamily(sonId, generation + 1, 'down');
      generateFamily(daughterId, generation + 1, 'down');
    }
  };
  
  // 从根夫妻开始生成（限制递归方向，避免重复生成）
  generateFamily('root_husband', 0, 'down');
  generateFamily('root_wife', 0, 'down');
  generateFamily('root_husband', 0, 'up');
  generateFamily('root_wife', 0, 'up');
  
  return familyTree;
};

// 计算两个人之间的关系
const calculateRelationship = (person1Id, person2Id, familyTree, perspective = 'husband') => {
  const person1 = familyTree[person1Id];
  const person2 = familyTree[person2Id];
  
  if (!person1 || !person2) return null;
  
  // 如果是同一个人
  if (person1Id === person2Id) {
    return {
      relationship: '本人',
      person2ToPerson1: '本人',
      person1ToPerson2: '本人'
    };
  }
  
  // 如果是夫妻关系
  if (person1.spouseId === person2Id) {
    return {
      relationship: '夫妻',
      person2ToPerson1: person1.gender === 'male' ? '丈夫' : '妻子',
      person1ToPerson2: person2.gender === 'male' ? '丈夫' : '妻子'
    };
  }
  
  // 计算亲属关系
  const relation = findFamilyRelation(person1, person2, familyTree);
  
  // 根据视角调整称呼
  const adjustedRelation = adjustRelationForPerspective(relation, perspective);
  
  return adjustedRelation;
};

// 查找家族关系
const findFamilyRelation = (person1, person2, familyTree) => {
  // 检查是否是直系亲属
  const directRelation = findDirectRelation(person1, person2, familyTree);
  if (directRelation) return directRelation;
  
  // 检查是否是旁系亲属
  const collateralRelation = findCollateralRelation(person1, person2, familyTree);
  if (collateralRelation) return collateralRelation;
  
  // 检查是否通过配偶关系连接
  const spouseRelation = findSpouseRelation(person1, person2, familyTree);
  if (spouseRelation) return spouseRelation;
  
  return {
    relationship: '远亲',
    person2ToPerson1: '远亲',
    person1ToPerson2: '远亲'
  };
};

// 查找直系关系
const findDirectRelation = (person1, person2, familyTree) => {
  // 检查父母子女关系
  if (person1.parentIds.includes(person2.id)) {
    return {
      relationship: '父母子女',
      person2ToPerson1: person2.gender === 'male' ? '儿子' : '女儿',
      person1ToPerson2: person1.gender === 'male' ? '父亲' : '母亲'
    };
  }
  
  if (person2.parentIds.includes(person1.id)) {
    return {
      relationship: '父母子女',
      person2ToPerson1: person2.gender === 'male' ? '父亲' : '母亲',
      person1ToPerson2: person1.gender === 'male' ? '儿子' : '女儿'
    };
  }
  
  // 检查祖父母孙子女关系
  const grandparents = findGrandparents(person1, familyTree);
  if (grandparents.includes(person2.id)) {
    return {
      relationship: '祖孙',
      person2ToPerson1: person2.gender === 'male' ? '孙子' : '孙女',
      person1ToPerson2: person1.gender === 'male' ? '爷爷/外公' : '奶奶/外婆'
    };
  }
  
  const grandchildren = findGrandchildren(person1, familyTree);
  if (grandchildren.includes(person2.id)) {
    return {
      relationship: '祖孙',
      person2ToPerson1: person2.gender === 'male' ? '爷爷/外公' : '奶奶/外婆',
      person1ToPerson2: person1.gender === 'male' ? '孙子' : '孙女'
    };
  }
  
  return null;
};

// 查找旁系关系
const findCollateralRelation = (person1, person2, familyTree) => {
  // 检查兄弟姐妹关系
  const siblings1 = findSiblings(person1, familyTree);
  if (siblings1.includes(person2.id)) {
    return {
      relationship: '兄弟姐妹',
      person2ToPerson1: person2.gender === 'male' ? 
        (person2.generation < person1.generation ? '哥哥' : '弟弟') :
        (person2.generation < person1.generation ? '姐姐' : '妹妹'),
      person1ToPerson2: person1.gender === 'male' ? 
        (person1.generation < person2.generation ? '哥哥' : '弟弟') :
        (person1.generation < person2.generation ? '姐姐' : '妹妹')
    };
  }
  
  // 检查叔伯姑姨舅关系
  const unclesAunts = findUnclesAunts(person1, familyTree);
  if (unclesAunts.includes(person2.id)) {
    return {
      relationship: '叔伯姑姨',
      person2ToPerson1: getUncleAuntTitle(person2, person1),
      person1ToPerson2: getNephewNieceTitle(person1, person2)
    };
  }
  
  // 检查堂表兄弟姐妹关系
  const cousins = findCousins(person1, familyTree);
  if (cousins.includes(person2.id)) {
    return {
      relationship: '堂表兄弟姐妹',
      person2ToPerson1: person2.gender === 'male' ? '堂/表兄弟' : '堂/表姐妹',
      person1ToPerson2: person1.gender === 'male' ? '堂/表兄弟' : '堂/表姐妹'
    };
  }
  
  return null;
};

// 查找配偶关系
const findSpouseRelation = (person1, person2, familyTree) => {
  // 检查是否是直接的配偶关系
  if (person1.spouseId === person2.id) {
    return {
      relationship: '夫妻',
      person2ToPerson1: person1.gender === 'male' ? '丈夫' : '妻子',
      person1ToPerson2: person2.gender === 'male' ? '丈夫' : '妻子'
    };
  }
  
  // 检查是否通过配偶关系连接的其他关系
  if (person1.spouseId) {
    const spouse = familyTree[person1.spouseId];
    if (spouse) {
      // 检查person2是否是配偶的父母
      if (spouse.parentIds && spouse.parentIds.includes(person2.id)) {
        return {
          relationship: '姻亲',
          person2ToPerson1: '岳父/公公',
          person1ToPerson2: person1.gender === 'male' ? '女婿' : '儿媳'
        };
      }
      
      // 检查person2是否是配偶的兄弟姐妹
      const spouseSiblings = findSiblings(spouse, familyTree);
      if (spouseSiblings.includes(person2.id)) {
        return {
          relationship: '姻亲',
          person2ToPerson1: person1.gender === 'male' ? '妻兄/妻弟' : '夫兄/夫弟',
          person1ToPerson2: person1.gender === 'male' ? '姐夫/妹夫' : '嫂子/弟媳'
        };
      }
    }
  }
  
  // 检查person1是否是person2配偶的父母
  if (person2.spouseId) {
    const spouse = familyTree[person2.spouseId];
    if (spouse && spouse.parentIds && spouse.parentIds.includes(person1.id)) {
      return {
        relationship: '姻亲',
        person2ToPerson1: person1.gender === 'male' ? '岳父/公公' : '岳母/婆婆',
        person1ToPerson2: person2.gender === 'male' ? '女婿' : '儿媳'
      };
    }
  }
  
  return null;
};

// 辅助函数
const findGrandparents = (person, familyTree) => {
  const grandparents = [];
  person.parentIds.forEach(parentId => {
    const parent = familyTree[parentId];
    if (parent && parent.parentIds) {
      grandparents.push(...parent.parentIds);
    }
  });
  return grandparents;
};

const findGrandchildren = (person, familyTree) => {
  const grandchildren = [];
  person.childrenIds.forEach(childId => {
    const child = familyTree[childId];
    if (child && child.childrenIds) {
      grandchildren.push(...child.childrenIds);
    }
  });
  return grandchildren;
};

const findSiblings = (person, familyTree) => {
  const siblings = [];
  person.parentIds.forEach(parentId => {
    const parent = familyTree[parentId];
    if (parent && parent.childrenIds) {
      parent.childrenIds.forEach(childId => {
        if (childId !== person.id) {
          siblings.push(childId);
        }
      });
    }
  });
  return [...new Set(siblings)];
};

const findUnclesAunts = (person, familyTree) => {
  const unclesAunts = [];
  person.parentIds.forEach(parentId => {
    const parent = familyTree[parentId];
    if (parent && parent.parentIds) {
      parent.parentIds.forEach(grandparentId => {
        const grandparent = familyTree[grandparentId];
        if (grandparent && grandparent.childrenIds) {
          grandparent.childrenIds.forEach(uncleAuntId => {
            if (uncleAuntId !== parentId) {
              unclesAunts.push(uncleAuntId);
            }
          });
        }
      });
    }
  });
  return [...new Set(unclesAunts)];
};

const findCousins = (person, familyTree) => {
  const cousins = [];
  const unclesAunts = findUnclesAunts(person, familyTree);
  unclesAunts.forEach(uncleAuntId => {
    const uncleAunt = familyTree[uncleAuntId];
    if (uncleAunt && uncleAunt.childrenIds) {
      cousins.push(...uncleAunt.childrenIds);
    }
  });
  return [...new Set(cousins)];
};

const getUncleAuntTitle = (uncleAunt, referencePerson) => {
  // 根据性别和关系确定具体称呼
  if (uncleAunt.gender === 'male') {
    return '叔叔/伯伯/舅舅';
  } else {
    return '姑姑/姨姨';
  }
};

const getNephewNieceTitle = (referencePerson, uncleAunt) => {
  if (referencePerson.gender === 'male') {
    return '侄子/外甥';
  } else {
    return '侄女/外甥女';
  }
};

// 根据视角调整关系称呼
const adjustRelationForPerspective = (relation, perspective) => {
  if (!relation) return relation;
  
  // 如果视角是妻，需要调整某些称呼
  if (perspective === 'wife') {
    // 这里可以根据妻子的视角调整称呼
    // 例如：丈夫的父亲应该称为"公公"，母亲称为"婆婆"
    // 但为了简化，暂时保持原样
  }
  
  return relation;
};

module.exports = {
  generateFamilyTree,
  calculateRelationship
};